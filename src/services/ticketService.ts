import type { Ticket } from '@/models/ticket';
import { httpClient, normalizeApiError } from '@/services/httpClient';

const BASE_URL = '/totem/ticket';

type TicketApiResponse = {
  message?: string | null;
  data?: string | null;
  letra?: string | null;
  numero?: number | string | null;
};

const normalizeTicket = (payload: TicketApiResponse): Ticket => {
  const ticketFromLegacyShape = `${payload.letra ?? ''}${payload.numero ?? ''}`.trim();
  const resolvedData = payload.data?.toString().trim() || ticketFromLegacyShape || null;

  return {
    message: payload.message?.trim() || null,
    data: resolvedData,
    letra: payload.letra ?? null,
    numero: payload.numero ?? null,
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