import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <AssessmentIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Evaluación Cardiovascular
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/home">
            Inicio
          </Button>
          <Button color="inherit" component={RouterLink} to="/evaluacion">
            Nueva Evaluación
          </Button>
          <Button color="inherit" component={RouterLink} to="/historial">
            Historial
          </Button>
          <Button color="inherit" onClick={handleLogout} sx={{ ml: 2, fontWeight: 'bold' }}>
            Cerrar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 
