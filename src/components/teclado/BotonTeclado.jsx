import React from 'react';
import { Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const StyledBotonTeclado = styled(Button)(({ theme }) => ({
  background: theme.palette.grey[700],
  color: theme.palette.common.white,
  fontSize: '60px',
  fontWeight: 500,
  borderRadius: 50,
  minWidth: 70,
  height: 100,
  margin: theme.spacing(0.3),
  '&:hover': { background: theme.palette.grey[800] },
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
}));

const BotonTeclado = ({ children, onClick, ...props }) => {
  return (
    <StyledBotonTeclado onClick={onClick} {...props}>
      {children}
    </StyledBotonTeclado>
  );
};

export default BotonTeclado;