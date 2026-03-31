import type { Ticket } from '@/models/ticket';
import { httpClient, normalizeApiError } from '@/services/httpClient';

const BASE_URL = '/totem/ticket';

type TicketApiResponse = {
  message?: string | null;
  ticket: string;
  enEspera: number;
};

const normalizeTicket = (payload: TicketApiResponse): Ticket => {
  return {
    message: payload.message?.trim() || null,
    ticket: payload.ticket,
    enEspera: payload.enEspera,
  };
};

// Permite ambos flujos: con clienteId o solo sectorId
export const generarTicket = async (
  sectorId: number,
  clienteId?: number
): Promise<Ticket> => {
  try {
    // Si hay clienteId, enviar ambos; si no, solo sectorId
    const payload = clienteId !== undefined
      ? { clienteId, sectorId }
      : { sectorId };
    const response = await httpClient.post<TicketApiResponse>(BASE_URL, payload);
    return normalizeTicket(response.data);
  } catch (error) {
    throw new Error(normalizeApiError(error, 'Error al generar ticket'));
  }
};