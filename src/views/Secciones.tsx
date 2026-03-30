import { Typography } from '@mui/material';

import Procesando from '@/components/dialogos/Procesando';
import TicketSuccess from '@/components/dialogos/TicketSuccess';
import ContenedorPrincipal from '@/components/layout/ContenedorPrincipal';
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

  return (
    <ContenedorPrincipal>
      {error && <Typography color="error">{error}</Typography>}
      <InnerSecciones sectores={sectores} cliente={cliente} onClick={handleSectionClick} onBack={handleBackClick} />
      <Procesando open={isLoading} />
      <TicketSuccess open={openTicketDialog} ticketData={ticketInfo} onClose={handleCloseTicketDialog} />
    </ContenedorPrincipal>
  );
};

export default Secciones;