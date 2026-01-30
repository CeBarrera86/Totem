import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ButtonProps } from '@mui/material/Button';

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
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('md')]: {
    fontSize: '44px',
    height: 90,
    minWidth: 64,
    borderRadius: 40,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '36px',
    height: 80,
    minWidth: 56,
    borderRadius: 32,
  },
}));

const BotonTeclado = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <StyledBotonTeclado onClick={onClick} {...props}>
      {children}
    </StyledBotonTeclado>
  );
};

export default BotonTeclado;