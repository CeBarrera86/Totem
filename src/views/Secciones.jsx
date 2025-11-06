import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContenedorPrincipal from '../components/layout/ContenedorPrincipal';
import TicketSuccess from '../components/dialogos/TicketSuccess';
import Procesando from '../components/dialogos/Procesando';
import useDatosCliente from '../components/utilidades/useDatosCliente';
import { getSectores } from '../services/sectorService';
import { generarTicket } from '../services/ticketService';
import InnerSecciones from '../components/pantallas/InnerSecciones.jsx';

const Secciones = () => {
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
      .catch((err) => setError(`Error al cargar secciones: ${err.message}`));
  }, []);

  const handleSectionClick = async (sectorId, event) => {
    if (event?.currentTarget) event.currentTarget.blur();
    setIsLoading(true);

    if (sectorId === 2) {
      setTimeout(() => {
        setIsLoading(false);
        navigate('/tramites');
      }, 500);
      return;
    }

    if (!cliente?.id) {
      alert("No se pudo obtener la información del cliente.");
      setIsLoading(false);
      return;
    }

    try {
      const ticket = await generarTicket(cliente.id, sectorId);
      setTicketInfo({ letra: ticket.letra, numero: ticket.numero });
      setOpenTicketDialog(true);
    } catch (err) {
      console.error("Error al generar ticket:", err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    sessionStorage.removeItem('datosCliente');
    navigate('/');
  };

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
      <InnerSecciones sectores={sectores} cliente={cliente} onClick={handleSectionClick} onBack={handleBackClick} />
      <Procesando open={isLoading} />
      <TicketSuccess open={openTicketDialog} ticketData={ticketInfo} onClose={handleCloseTicketDialog} />
    </ContenedorPrincipal>
  );
};

export default Secciones;