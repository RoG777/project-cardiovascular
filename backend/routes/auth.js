const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, email, password, documento, role_id } = req.body;
  try {
    // Verificar si el usuario ya existe
    const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insertar usuario
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, documento, role_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nombre, email, documento, role_id, status',
      [nombre, email, hashedPassword, documento, role_id || 2, 'activo'] // role_id 2 = usuario por defecto
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role_id: user.role_id },
      process.env.JWT_SECRET || 'secreto',
      { expiresIn: '8h' }
    );
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, role_id: user.role_id, status: user.status } });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
});

// Ruta protegida: perfil del usuario autenticado
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre, email, documento, role_id, status, creado_en, updated_at FROM usuarios WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
  }
});

module.exports = router; 