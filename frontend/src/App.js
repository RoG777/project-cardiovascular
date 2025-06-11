import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Componentes
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Evaluacion from './pages/Evaluacion';
import Historial from './pages/Historial';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/evaluacion" element={<Evaluacion />} />
            <Route path="/historial" element={<Historial />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
