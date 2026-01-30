import type { Sector } from '@/models/sector';
import type { Tramite } from '@/models/tramite';
import { httpClient, normalizeApiError } from '@/services/httpClient';

const BASE_URL = '/Sector';

export const getSectores = async (): Promise<Sector[]> => {
  try {
    const response = await httpClient.get<Sector[]>(`${BASE_URL}/totem-sectores`);
    return response.data;
  } catch (error) {
    throw new Error(normalizeApiError(error, 'Error al obtener sectores'));
  }
};

export const getTramites = async (): Promise<Tramite[]> => {
  try {
    const response = await httpClient.get<Tramite[]>(`${BASE_URL}/totem-tramites`);
    return response.data;
  } catch (error) {
    throw new Error(normalizeApiError(error, 'Error al obtener trámites'));
  }
};