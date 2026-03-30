import { useCallback, useState } from 'react';

import type { Ticket } from '@/models/ticket';
import { printTicket } from '@/services/ticketPrintService';
import { generarTicket } from '@/services/ticketService';

type TicketRequestArgs = {
  sectorId: number;
  clienteId?: number;
};

export const useTicketFlow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<Ticket | null>(null);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const [ticketError, setTicketError] = useState('');

  const requestTicket = useCallback(async ({ sectorId, clienteId }: TicketRequestArgs) => {
    setIsLoading(true);
    setTicketError('');

    try {
      const ticket = await generarTicket(sectorId, clienteId);
      await printTicket(ticket).catch((printError) => {
        console.error('No se pudo imprimir el ticket:', printError);
      });
      setTicketInfo(ticket);
      setOpenTicketDialog(true);
      return true;
    } catch (error) {
      setTicketError(error instanceof Error ? error.message : 'Error al generar ticket');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const closeTicketDialog = useCallback(() => {
    setOpenTicketDialog(false);
  }, []);

  const clearTicketError = useCallback(() => {
    setTicketError('');
  }, []);

  return {
    isLoading,
    ticketInfo,
    openTicketDialog,
    ticketError,
    requestTicket,
    closeTicketDialog,
    clearTicketError,
  };
};
