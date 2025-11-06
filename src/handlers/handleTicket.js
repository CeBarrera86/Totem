import { generarTicket } from '../services/ticketService';

export const handleTicket = async ({ clienteId, sectorId, setIsLoading, setTicketInfo, setOpenTicketDialog }) => {
  setIsLoading(true);
  try {
    const ticket = await generarTicket(clienteId, sectorId);
    setTicketInfo({ letra: ticket.letra, numero: ticket.numero });
    setOpenTicketDialog(true);
  } catch (err) {
    console.error("Error al generar ticket:", err);
    alert(err.message);
  } finally {
    setIsLoading(false);
  }
};
