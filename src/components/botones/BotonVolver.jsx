// src/components/botones/BotonVolver.jsx
import React from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Importa useTheme

const BotonVolver = ({ onClick, sx = {}, ...props }) => {
  const theme = useTheme(); // Accede al tema

  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        bgcolor: theme.palette.error.main, // Usando color del tema
        color: theme.palette.error.contrastText, // Usando color del tema
        fontSize: '1.5rem',
        borderRadius: 2,
        '&:hover': { bgcolor: theme.palette.error.dark }, // Usando color del tema
        width: 'auto',
        minWidth: '300px',
        ...sx
      }}
      {...props}
    >
      VOLVER
    </Button>
  );
};

export default BotonVolver;