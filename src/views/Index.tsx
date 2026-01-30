import { Typography } from '@mui/material';

import ContenedorPrincipal from '@/components/layout/ContenedorPrincipal';
import Procesando from '@/components/dialogos/Procesando';
import TicketSuccess from '@/components/dialogos/TicketSuccess';
import InnerIndex from '@/components/pantallas/InnerIndex';
import { useIndexController } from '@/controllers/useIndexController';

const Index = () => {
  const {
    sectores,
    isLoading,
    ticketInfo,
    openTicketDialog,
    error,
    handleSectionClick,
    handleCloseTicketDialog,
  } = useIndexController();

  if (error) {
    return (
      <ContenedorPrincipal>
        <Typography color="error">{error}</Typography>
      </ContenedorPrincipal>
    );
  }

  return (
    <ContenedorPrincipal>
      <InnerIndex sectores={sectores} onClick={handleSectionClick} />
      <Procesando open={isLoading} />
      <TicketSuccess open={openTicketDialog} ticketData={ticketInfo} onClose={handleCloseTicketDialog} />
    </ContenedorPrincipal>
  );
};

export default Index;