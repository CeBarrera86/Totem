import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContenedorPrincipal from '../components/layout/ContenedorPrincipal';
import Procesando from '../components/dialogos/Procesando';
import TicketSuccess from '../components/dialogos/TicketSuccess';
import { getSectores } from '../services/sectorService';
import { handleTicket } from '../handlers/handleTicket';
import InnerIndex from '../components/pantallas/InnerIndex';

const Index = () => {
  const navigate = useNavigate();
  const [sectores, setSectores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getSectores()
      .then(setSectores)
      .catch((err) => setError(`Error al cargar secciones: ${err.message}`));
  }, []);

  const handleSectionClick = (sectorId, event) => {
    if (event?.currentTarget) event.currentTarget.blur();
    handleTicket({
      clienteId: 1,
      sectorId,
      setIsLoading,
      setTicketInfo,
      setOpenTicketDialog
    });
  };

  const handleCloseTicketDialog = () => {
    setOpenTicketDialog(false);
    navigate('/');
  };

  if (error) {
    return (
      <ContenedorPrincipal> <p style={{ color: 'red' }}>{error}</p> </ContenedorPrincipal>
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