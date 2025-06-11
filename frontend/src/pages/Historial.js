import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Datos de ejemplo (esto vendrá del backend)
const evaluacionesEjemplo = [
  {
    id: 1,
    fecha: '2024-03-11',
    nombre: 'Juan Pérez',
    edad: 45,
    presionSistolica: 120,
    presionDiastolica: 80,
    frecuenciaCardiaca: 72,
    estado: 'Normal',
  },
  {
    id: 2,
    fecha: '2024-03-10',
    nombre: 'María García',
    edad: 38,
    presionSistolica: 135,
    presionDiastolica: 85,
    frecuenciaCardiaca: 78,
    estado: 'Pre-hipertensión',
  },
];

const Historial = () => {
  const getEstadoColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'normal':
        return 'success';
      case 'pre-hipertensión':
        return 'warning';
      case 'hipertensión':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Historial de Evaluaciones
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Edad</TableCell>
                <TableCell>Presión Arterial</TableCell>
                <TableCell>Frecuencia Cardíaca</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {evaluacionesEjemplo.map((evaluacion) => (
                <TableRow key={evaluacion.id}>
                  <TableCell>{evaluacion.fecha}</TableCell>
                  <TableCell>{evaluacion.nombre}</TableCell>
                  <TableCell>{evaluacion.edad}</TableCell>
                  <TableCell>
                    {evaluacion.presionSistolica}/{evaluacion.presionDiastolica}
                  </TableCell>
                  <TableCell>{evaluacion.frecuenciaCardiaca}</TableCell>
                  <TableCell>
                    <Chip
                      label={evaluacion.estado}
                      color={getEstadoColor(evaluacion.estado)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => console.log('Ver detalles:', evaluacion.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Historial; 