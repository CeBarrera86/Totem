import { Typography } from '@mui/material';

import ContenedorPrincipal from '@/components/layout/ContenedorPrincipal';
import Procesando from '@/components/dialogos/Procesando';
import TicketSuccess from '@/components/dialogos/TicketSuccess';
import InnerTramites from '@/components/pantallas/InnerTramites';
import { useTramitesController } from '@/controllers/useTramitesController';

const Tramites = () => {
  const {
    cliente,
    tramites,
    isLoading,
    ticketInfo,
    openTicketDialog,
    error,
    handleTramiteClick,
    handleBackClick,
    handleCloseTicketDialog,
  } = useTramitesController();

  if (error) {
    return (
      <ContenedorPrincipal>
        <Typography color="error">{error}</Typography>
      </ContenedorPrincipal>
    );
  }

  return (
    <ContenedorPrincipal>
      <InnerTramites tramites={tramites} cliente={cliente} onClick={handleTramiteClick} onBack={handleBackClick} />
      <Procesando open={isLoading} />
      <TicketSuccess open={openTicketDialog} ticketData={ticketInfo} onClose={handleCloseTicketDialog} />
    </ContenedorPrincipal>
  );
};

export default Tramites;