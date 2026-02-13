import type { Sector } from '@/models/sector';
import type { Tramite } from '@/models/tramite';
import { httpClient, normalizeApiError } from '@/services/httpClient';

const BASE_URL = '/Sector';

type SectorApi = {
  TUS_ID: number;
  TUS_NOMBRE: string;
  TUS_DESCRIPCION: string;
  TUS_PADRE_ID?: number | null;
};

export const getSectores = async (): Promise<Sector[]> => {
  try {
    const response = await httpClient.get<SectorApi[]>('/totem/sectores');
    return response.data.map((item) => ({
      id: item.TUS_ID,
      nombre: item.TUS_NOMBRE,
      descripcion: item.TUS_DESCRIPCION,
      padreId: item.TUS_PADRE_ID ?? null,
    }));
  } catch (error) {
    throw new Error(normalizeApiError(error, 'Error al obtener sectores'));
  }
};

export const getTramites = async (): Promise<Tramite[]> => {
  try {
    const response = await httpClient.get<Tramite[]>('/totem/sector/tramites');
    return response.data;
  } catch (error) {
    throw new Error(normalizeApiError(error, 'Error al obtener trámites'));
  }
};