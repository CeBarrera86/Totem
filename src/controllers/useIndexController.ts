import { type MouseEvent,useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTicketFlow } from '@/hooks/useTicketFlow';
import type { Sector } from '@/models/sector';
import { getSectores } from '@/services/sectorService';

export const useIndexController = () => {
  const navigate = useNavigate();
  const [sectores, setSectores] = useState<Sector[]>([]);
  const [dataError, setDataError] = useState('');
  const { isLoading, ticketInfo, openTicketDialog, ticketError, requestTicket, closeTicketDialog, clearTicketError } =
    useTicketFlow();

  const fetchSectores = useCallback(() => {
    getSectores()
      .then(setSectores)
      .catch((err: Error) => setDataError(`Error al cargar secciones: ${err.message}`));
  }, []);

  useEffect(() => {
    fetchSectores();
  }, [fetchSectores]);

  const handleSectionClick = (sectorId: number, event?: MouseEvent<HTMLButtonElement>) => {
    if (event?.currentTarget) {event.currentTarget.blur();}
    clearTicketError();
    void requestTicket({ sectorId });
  };

  const handleCloseTicketDialog = () => {
    closeTicketDialog();
    navigate('/index');
  };

  return {
    sectores,
    isLoading,
    ticketInfo,
    openTicketDialog,
    error: dataError || ticketError,
    handleSectionClick,
    handleCloseTicketDialog,
  };
};