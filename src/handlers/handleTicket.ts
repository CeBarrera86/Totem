import { generarTicket } from '@/services/ticketService';

interface HandleTicketArgs {
  sectorId: number;
  clienteId?: number;
  setIsLoading: (value: boolean) => void;
  setTicketInfo: (ticket: { letra?: string | null; numero?: number | string | null }) => void;
  setOpenTicketDialog: (value: boolean) => void;
}

export const handleTicket = async ({
  sectorId,
  clienteId,
  setIsLoading,
  setTicketInfo,
  setOpenTicketDialog,
}: HandleTicketArgs) => {
  setIsLoading(true);
  try {
    const ticket = await generarTicket(sectorId, clienteId);
    setTicketInfo({ letra: ticket.letra, numero: ticket.numero });
    setOpenTicketDialog(true);
  } catch (err) {
    console.error('Error al generar ticket:', err);
    alert(err instanceof Error ? err.message : 'Error al generar ticket');
  } finally {
    setIsLoading(false);
  }
};