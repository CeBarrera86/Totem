import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledBotonAccion = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  margin: theme.spacing(1),
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
  },
}));

const BotonAccion = ({ children, onClick, sx, buttonColor = "success", ...props }) => {
  return (
    <StyledBotonAccion variant="contained" color={buttonColor} onClick={onClick} sx={sx} {...props} >
      {children}
    </StyledBotonAccion>
  );
};

export default BotonAccion;