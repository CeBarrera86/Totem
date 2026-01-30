import { Typography } from '@mui/material';

import ContenedorPrincipal from '@/components/layout/ContenedorPrincipal';
import TicketSuccess from '@/components/dialogos/TicketSuccess';
import Procesando from '@/components/dialogos/Procesando';
import InnerSecciones from '@/components/pantallas/InnerSecciones';
import { useSeccionesController } from '@/controllers/useSeccionesController';

const Secciones = () => {
  const {
    cliente,
    sectores,
    isLoading,
    ticketInfo,
    openTicketDialog,
    error,
    handleSectionClick,
    handleBackClick,
    handleCloseTicketDialog,
  } = useSeccionesController();

  if (error) {
    return (
      <ContenedorPrincipal>
        <Typography color="error">{error}</Typography>
      </ContenedorPrincipal>
    );
  }

  return (
    <ContenedorPrincipal>
      <InnerSecciones sectores={sectores} cliente={cliente} onClick={handleSectionClick} onBack={handleBackClick} />
      <Procesando open={isLoading} />
      <TicketSuccess open={openTicketDialog} ticketData={ticketInfo} onClose={handleCloseTicketDialog} />
    </ContenedorPrincipal>
  );
};

export default Secciones;