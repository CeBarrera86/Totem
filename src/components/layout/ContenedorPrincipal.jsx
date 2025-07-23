// src/components/layout/ContenedorPrincipal.jsx
import React from 'react';
import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Importa useTheme

const ContenedorPrincipal = ({ children }) => {
  const theme = useTheme(); // Accede al tema

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default, // Usando color de fondo del tema
        minHeight: 'calc(100vh - 150px)', // Ajusta según el tamaño de tu header/footer
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 2, md: 4 }
      }}
    >
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', height: '100%' }}>
        {children}
      </Container>
    </Box>
  );
};

export default ContenedorPrincipal;