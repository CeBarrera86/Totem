// src/components/teclado/Teclado.jsx
import React from 'react';
import { Box } from '@mui/material';
import KeypadButton from './BotonTeclado';

const Keypad = ({ onNumberClick, onBackspace }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1,
        bgcolor: '#fff',
        borderRadius: 5,
        p: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        height: '100%'
      }}
    >
      {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
        <KeypadButton
          key={num}
          onClick={() => onNumberClick(num.toString())}
        >
          {num}
        </KeypadButton>
      ))}
      <KeypadButton
        onClick={onBackspace}
        sx={{
          gridColumn: '2 / span 2',
          bgcolor: '#dc3545',
          fontSize: '40px',
          fontWeight: 'bold',
          '&:hover': { bgcolor: '#c82333' },
        }}
      >
        BORRAR
      </KeypadButton>
    </Box>
  );
};

export default Keypad;