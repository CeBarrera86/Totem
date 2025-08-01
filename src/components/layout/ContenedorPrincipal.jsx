import React from 'react';
import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ContenedorPrincipal = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: 'calc(100vh - 150px)',
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