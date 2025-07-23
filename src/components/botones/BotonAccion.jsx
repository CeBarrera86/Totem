// src/components/botones/BotonAccion.jsx
import React from 'react';
import { Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles'; // Importa useTheme

const StyledBotonAccion = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  margin: theme.spacing(1),
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
  },
  bgcolor: theme.palette.success.main, // Usando color del tema
  color: theme.palette.success.contrastText, // Usando color del tema
  '&:hover': {
    bgcolor: theme.palette.success.dark, // Usando color del tema
  },
}));

const BotonAccion = ({ children, onClick, sx, ...props }) => {
  return (
    <StyledBotonAccion
      variant="contained"
      onClick={onClick}
      sx={sx}
      {...props}
    >
      {children}
    </StyledBotonAccion>
  );
};

export default BotonAccion;