import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ContenedorPrincipal from '../components/layout/ContenedorPrincipal';
import Procesando from '../components/dialogos/Procesando';
import TicketSuccess from '../components/dialogos/TicketSuccess';

import useDatosCliente from '../components/utilidades/useDatosCliente';
import { getSectores } from '../services/sectorService';
import { generarTicket } from '../services/ticketService';
import InnerTramites from '../components/pantallas/InnerTramites.jsx';

const Tramites = () => {
  const navigate = useNavigate();
  const cliente = useDatosCliente();

  const [sectores, setSectores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getSectores()
      .then(setSectores)
      .catch((err) => setError(`Error al cargar trámites: ${err.message}`));
  }, []);

  const handleTramiteClick = async (tramite, event) => {
    if (event?.currentTarget) event.currentTarget.blur();
    setIsLoading(true);

    if (!cliente?.id) {
      alert("No se pudo obtener la información del cliente.");
      setIsLoading(false);
      return;
    }

    const sectorPadreId = tramite.padreId;
    if (!sectorPadreId) {
      alert("No se pudo determinar el sector de origen para este trámite.");
      setIsLoading(false);
      return;
    }

    try {
      const ticket = await generarTicket(cliente.id, sectorPadreId);
      setTicketInfo({ letra: ticket.letra, numero: ticket.numero });
      setOpenTicketDialog(true);
    } catch (err) {
      console.error("Error al generar ticket:", err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => { navigate('/secciones'); };

  const handleCloseTicketDialog = () => {
    setOpenTicketDialog(false);
    sessionStorage.removeItem('datosCliente');
    navigate('/');
  };

  if (error) {
    return (
      <ContenedorPrincipal> <p style={{ color: 'red' }}>{error}</p> </ContenedorPrincipal>
    );
  }

  return (
    <ContenedorPrincipal>
      <InnerTramites
        sectores={sectores}
        cliente={cliente}
        onClick={handleTramiteClick}
        onBack={handleBackClick}
      />
      <Procesando open={isLoading} />
      <TicketSuccess open={openTicketDialog} ticketData={ticketInfo} onClose={handleCloseTicketDialog} />
    </ContenedorPrincipal>
  );
};

export default Tramites;