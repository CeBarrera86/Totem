import { Dialog, DialogContent, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ProcesandoProps {
  open: boolean;
  message?: string;
}

const Procesando = ({ open, message = 'Procesando...' }: ProcesandoProps) => {
  const theme = useTheme();

  const dialogStyles = {
    '& .MuiDialog-paper': {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      boxShadow: 'none',
      overflow: 'hidden',
      borderRadius: theme.spacing(2),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <Dialog open={open} aria-labelledby="loading-dialog-title" disableAutoFocus sx={dialogStyles}>
      <DialogContent sx={{ textAlign: 'center', p: theme.spacing(4) }}>
        <CircularProgress sx={{ color: theme.palette.warning.main, mb: theme.spacing(2) }} size={80} thickness={5} />
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
          {message}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default Procesando;