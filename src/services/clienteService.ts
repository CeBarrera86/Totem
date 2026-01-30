import type { Cliente } from '@/models/cliente';
import { httpClient, normalizeApiError } from '@/services/httpClient';

const BASE_URL = '/Cliente';

export const getClientePorDni = async (dni: string): Promise<Cliente> => {
  try {
    const response = await httpClient.get<Cliente>(`${BASE_URL}/${dni}`);
    return response.data;
  } catch (error) {
    throw new Error(normalizeApiError(error, `No se encontró el cliente con DNI ${dni}`));
  }
};