import { useEffect, useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { handleTicket } from '@/handlers/handleTicket';
import { getSectores } from '@/services/sectorService';
import type { Sector } from '@/models/sector';
import type { Ticket } from '@/models/ticket';

export const useIndexController = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<Ticket | null>(null);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const [sectores, setSectores] = useState<Sector[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getSectores()
      .then(setSectores)
      .catch((err: Error) => setError(`Error al cargar secciones: ${err.message}`));
  }, []);

  const handleSectionClick = (sectorId: number, event?: MouseEvent<HTMLButtonElement>) => {
    if (event?.currentTarget) event.currentTarget.blur();
    handleTicket({
      clienteId: 1,
      sectorId,
      setIsLoading,
      setTicketInfo,
      setOpenTicketDialog,
    });
  };

  const handleCloseTicketDialog = () => {
    setOpenTicketDialog(false);
    navigate('/');
  };

  return {
    sectores,
    isLoading,
    ticketInfo,
    openTicketDialog,
    error,
    handleSectionClick,
    handleCloseTicketDialog,
  };
};