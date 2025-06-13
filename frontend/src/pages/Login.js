import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginService({ email, password });
      localStorage.setItem('auth', 'ok');
      localStorage.setItem('token', data.token); // Guardar el token JWT
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Error al iniciar sesión. Intenta de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
    }}>
      <div style={{
        background: '#fdeaea',
        borderRadius: '20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
        padding: '40px',
        display: 'flex',
        gap: '40px',
        maxWidth: '900px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontWeight: 'bold' }}>Texto motivacional</h2>
          <p>Texto para poner de ejemplo de acuerdo a lo que quiera el cliente en este espacio</p>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          padding: '32px',
          minWidth: '340px',
          flex: 1,
        }}>
          <h2 style={{ marginBottom: 0 }}>Ingreso</h2>
          <p style={{ marginTop: 0, color: '#666', fontSize: '15px' }}>Bienvenido de nuevo! porfavor ingresa a tu cuenta</p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: 4 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
                required
                disabled={loading}
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', marginBottom: 4 }}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
                required
                disabled={loading}
              />
            </div>
            <div style={{ textAlign: 'right', marginBottom: '16px' }}>
              <a href="#" style={{ color: '#1976d2', fontSize: '14px', textDecoration: 'none', fontWeight: 'bold' }}>Olvide mi contraseña</a>
            </div>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            <button
              type="submit"
              style={{
                width: '100%',
                background: '#e05a5a',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '8px',
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 