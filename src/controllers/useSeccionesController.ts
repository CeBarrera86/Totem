import { useEffect, useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import useDatosCliente from '@/hooks/useDatosCliente';
import { getSectores } from '@/services/sectorService';
import { generarTicket } from '@/services/ticketService';
import type { Sector } from '@/models/sector';
import type { Ticket } from '@/models/ticket';

export const useSeccionesController = () => {
  const navigate = useNavigate();
  const cliente = useDatosCliente();
  const [sectores, setSectores] = useState<Sector[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<Ticket | null>(null);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getSectores()
      .then(setSectores)
      .catch((err: Error) => setError(`Error al cargar secciones: ${err.message}`));
  }, []);

  const handleSectionClick = async (sectorId: number, event?: MouseEvent<HTMLButtonElement>) => {
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
      alert('No se pudo obtener la información del cliente.');
      setIsLoading(false);
      return;
    }

    try {
      const ticket = await generarTicket(cliente.id, sectorId);
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
    sessionStorage.removeItem('datosCliente');
    navigate('/');
  };

  const handleCloseTicketDialog = () => {
    setOpenTicketDialog(false);
    sessionStorage.removeItem('datosCliente');
    navigate('/');
  };

  return {
    cliente,
    sectores,
    isLoading,
    ticketInfo,
    openTicketDialog,
    error,
    handleSectionClick,
    handleBackClick,
    handleCloseTicketDialog,
  };
};