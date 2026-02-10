import type { Ticket } from '@/models/ticket';
import { httpClient, normalizeApiError } from '@/services/httpClient';

const BASE_URL = '/Ticket/totem';

export const generarTicket = async (clienteId: number, sectorId: number): Promise<Ticket> => {
  try {
    const response = await httpClient.post<Ticket>(BASE_URL, { clienteId, sectorIdOrigen: sectorId });
    return response.data;
  } catch (error) {
    throw new Error(normalizeApiError(error, 'Error al generar ticket'));
  }
};