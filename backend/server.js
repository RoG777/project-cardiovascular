const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const pool = require('./db');

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas básicas
app.get('/', (req, res) => {
    res.json({ message: 'API de Evaluaciones Cardiovasculares' });
});

app.use('/api/auth', authRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;

console.log('DB_USER:', process.env.DB_USER, typeof process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD, typeof process.env.DB_PASSWORD);

// Prueba de conexión
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error de conexión a PostgreSQL:', err.message);
  }
  console.log('¡Conexión a PostgreSQL exitosa!');
  release();
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});