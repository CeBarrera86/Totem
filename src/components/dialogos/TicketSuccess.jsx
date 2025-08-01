import React, { useEffect } from 'react';
import { Dialog, DialogContent, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BsCheckCircleFill } from 'react-icons/bs';

const TicketSuccess = ({ open, ticketData, onClose }) => {
  const theme = useTheme();

  // Maneja el cierre automático del diálogo
  useEffect(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => {
        onClose();
      }, 1500);
    }

    // Función de limpieza para cancelar el temporizador si el componente se desmonta
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [open, onClose]);

  if (!ticketData) {
    return null;
  }

  const dialogStyles = {
    '& .MuiDialog-paper': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      borderRadius: theme.spacing(2),
      width: '100%',
      maxWidth: '550px',
      overflow: 'hidden',
    },
  };

  const ticket = `${ticketData.letra || ''}${ticketData.numero ?? ''}`;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="ticket-success-dialog-title" sx={dialogStyles} >
      <DialogContent sx={{ textAlign: 'center', p: theme.spacing(4) }}>
        <Box sx={{ color: theme.palette.success.main, mb: theme.spacing(2) }}>
          <BsCheckCircleFill size={80} />
        </Box>
        <Typography id="ticket-success-dialog-title" variant="h4" sx={{ fontWeight: 'bold', mb: theme.spacing(1), color: theme.palette.corpico.naranja }}>
          ¡Ticket Generado con Éxito!
        </Typography>
        <Typography variant="h6" sx={{ color: theme.palette.text.third }}>
          Su turno es:
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 'bolder', color: theme.palette.corpico.naranja, mb: theme.spacing(3) }}>
          {ticket}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default TicketSuccess;