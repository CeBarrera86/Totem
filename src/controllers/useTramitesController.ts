import { type MouseEvent,useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useDatosCliente from '@/hooks/useDatosCliente';
import { useTicketFlow } from '@/hooks/useTicketFlow';
import type { Tramite } from '@/models/tramite';
import { getTramites } from '@/services/sectorService';
import { clearClienteSession } from '@/services/sessionClienteStorage';

export const useTramitesController = () => {
  const navigate = useNavigate();
  const cliente = useDatosCliente();

  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [dataError, setDataError] = useState('');
  const [actionError, setActionError] = useState('');
  const { isLoading, ticketInfo, openTicketDialog, ticketError, requestTicket, closeTicketDialog, clearTicketError } =
    useTicketFlow();

  const fetchTramites = useCallback(() => {
    getTramites()
      .then(setTramites)
      .catch((err: Error) => setDataError(`Error al cargar tramites: ${err.message}`));
  }, []);

  useEffect(() => {
    fetchTramites();
  }, [fetchTramites]);

  const handleTramiteClick = async (tramite: Tramite, event?: MouseEvent<HTMLButtonElement>) => {
    if (event?.currentTarget) {event.currentTarget.blur();}
    setActionError('');
    clearTicketError();

    if (!cliente?.id) {
      setActionError('No se pudo obtener la informacion del cliente.');
      return;
    }

    const sectorPadreId = tramite.padreId;
    if (!sectorPadreId) {
      setActionError('No se pudo determinar el sector de origen para este tramite.');
      return;
    }

    await requestTicket({ sectorId: sectorPadreId, clienteId: cliente.id });
  };

  const handleBackClick = () => {
    navigate('/secciones');
  };

  const handleCloseTicketDialog = () => {
    closeTicketDialog();
    clearClienteSession();
    navigate('/');
  };

  return {
    cliente,
    tramites,
    isLoading,
    ticketInfo,
    openTicketDialog,
    error: dataError || actionError || ticketError,
    handleTramiteClick,
    handleBackClick,
    handleCloseTicketDialog,
  };
};