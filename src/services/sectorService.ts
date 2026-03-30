import type { Sector } from '@/models/sector';
import type { Tramite } from '@/models/tramite';
import { httpClient, normalizeApiError } from '@/services/httpClient';
import { mapSectoresApi, mapTramitesApi } from '@/services/totemMappers';

export const getSectores = async (): Promise<Sector[]> => {
  try {
    const response = await httpClient.get('/totem/sectores');
    return mapSectoresApi(response.data);
  } catch (error) {
    throw new Error(normalizeApiError(error, 'Error al obtener sectores'));
  }
};

export const getTramites = async (): Promise<Tramite[]> => {
  try {
    const response = await httpClient.get('/totem/sector/tramites');
    return mapTramitesApi(response.data);
  } catch (error) {
    throw new Error(normalizeApiError(error, 'Error al obtener trámites'));
  }
};