import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ButtonProps } from '@mui/material/Button';

const StyledBotonVolver = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  margin: theme.spacing(1),
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
  },
  fontSize: '1.5rem',
  width: 'auto',
  minWidth: '300px',
}));

const BotonVolver = ({ onClick, sx = {}, ...props }: ButtonProps) => {
  return (
    <StyledBotonVolver variant="contained" color="error" onClick={onClick} sx={sx} {...props}>
      VOLVER
    </StyledBotonVolver>
  );
};

export default BotonVolver;