import { type MouseEvent,useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useDatosCliente from '@/hooks/useDatosCliente';
import { useTicketFlow } from '@/hooks/useTicketFlow';
import type { Sector } from '@/models/sector';
import { getSectores } from '@/services/sectorService';
import { clearClienteSession } from '@/services/sessionClienteStorage';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useSeccionesController = () => {
  const navigate = useNavigate();
  const cliente = useDatosCliente();
  const [sectores, setSectores] = useState<Sector[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [dataError, setDataError] = useState('');
  const [actionError, setActionError] = useState('');
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

  const handleSectionClick = async (sectorId: number, event?: MouseEvent<HTMLButtonElement>) => {
    if (event?.currentTarget) {event.currentTarget.blur();}
    setActionError('');
    clearTicketError();

    if (sectorId === 2) {
      setIsNavigating(true);
      await wait(500);
      setIsNavigating(false);
      navigate('/tramites');
      return;
    }

    if (!cliente?.id) {
      setActionError('No se pudo obtener la informacion del cliente.');
      return;
    }

    await requestTicket({ sectorId, clienteId: cliente.id });
  };

  const handleBackClick = () => {
    clearClienteSession();
    navigate('/');
  };

  const handleCloseTicketDialog = () => {
    closeTicketDialog();
    clearClienteSession();
    navigate('/');
  };

  return {
    cliente,
    sectores,
    isLoading: isLoading || isNavigating,
    ticketInfo,
    openTicketDialog,
    error: dataError || actionError || ticketError,
    handleSectionClick,
    handleBackClick,
    handleCloseTicketDialog,
  };
};