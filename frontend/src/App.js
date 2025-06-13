import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Componentes
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Evaluacion from './pages/Evaluacion';
import Historial from './pages/Historial';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/evaluacion" element={<PrivateRoute><Evaluacion /></PrivateRoute>} />
        <Route path="/historial" element={<PrivateRoute><Historial /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
