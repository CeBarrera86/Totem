import type { Ticket } from '@/models/ticket';
import { httpClient, normalizeApiError } from '@/services/httpClient';

const BASE_URL = '/totem/ticket';

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
    const response = await httpClient.post<Ticket>(BASE_URL, payload);
    return response.data;
  } catch (error) {
    throw new Error(normalizeApiError(error, 'Error al generar ticket'));
  }
};