import { useEffect, useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import useDatosCliente from '@/hooks/useDatosCliente';
import { getTramites } from '@/services/sectorService';
import { generarTicket } from '@/services/ticketService';
import type { Tramite } from '@/models/tramite';
import type { Ticket } from '@/models/ticket';

export const useTramitesController = () => {
  const navigate = useNavigate();
  const cliente = useDatosCliente();

  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<Ticket | null>(null);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getTramites()
      .then(setTramites)
      .catch((err: Error) => setError(`Error al cargar trámites: ${err.message}`));
  }, []);

  const handleTramiteClick = async (tramite: Tramite, event?: MouseEvent<HTMLButtonElement>) => {
    if (event?.currentTarget) event.currentTarget.blur();
    setIsLoading(true);

    if (!cliente?.id) {
      alert('No se pudo obtener la información del cliente.');
      setIsLoading(false);
      return;
    }

    const sectorPadreId = tramite.padreId;
    if (!sectorPadreId) {
      alert('No se pudo determinar el sector de origen para este trámite.');
      setIsLoading(false);
      return;
    }

    try {
      const ticket = await generarTicket(cliente.id, sectorPadreId);
      setTicketInfo({ letra: ticket.letra, numero: ticket.numero });
      setOpenTicketDialog(true);
    } catch (err) {
      console.error('Error al generar ticket:', err);
      alert(err instanceof Error ? err.message : 'Error al generar ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/secciones');
  };

  const handleCloseTicketDialog = () => {
    setOpenTicketDialog(false);
    sessionStorage.removeItem('datosCliente');
    navigate('/');
  };

  return {
    cliente,
    tramites,
    isLoading,
    ticketInfo,
    openTicketDialog,
    error,
    handleTramiteClick,
    handleBackClick,
    handleCloseTicketDialog,
  };
};