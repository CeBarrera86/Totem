import type { Sector } from '@/models/sector';
import type { Tramite } from '@/models/tramite';

type SectorApi = {
  TUS_ID?: number;
  TUS_NOMBRE?: string;
  TUS_DESCRIPCION?: string;
  TUS_PADRE_ID?: number | null;
  id?: number;
  nombre?: string;
  descripcion?: string;
  padreId?: number | null;
};

type TramiteApi = {
  id?: number;
  descripcion?: string;
  padreId?: number | null;
  TUS_ID?: number;
  TUS_DESCRIPCION?: string;
  TUS_PADRE_ID?: number | null;
};

type CollectionResponse<T> = T[] | { data?: T[] };

const normalizeText = (value?: string | null) => value?.trim() ?? '';

const extractCollection = <T,>(payload: CollectionResponse<T>): T[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
};

export const mapTramiteApiToTramite = (item: TramiteApi): Tramite => {
  return {
    id: item.id ?? item.TUS_ID ?? 0,
    descripcion: normalizeText(item.descripcion ?? item.TUS_DESCRIPCION),
    padreId: item.padreId ?? item.TUS_PADRE_ID ?? null,
  };
};

export const mapSectoresApi = (payload: CollectionResponse<SectorApi>): Sector[] => {
  // Definición local de mapSectorApiToSector
  const mapSectorApiToSector = (item: SectorApi): Sector => {
    return {
      id: item.TUS_ID ?? item.id ?? 0,
      nombre: normalizeText(item.TUS_NOMBRE ?? item.nombre),
      descripcion: normalizeText(item.TUS_DESCRIPCION ?? item.descripcion),
      padreId: item.TUS_PADRE_ID ?? item.padreId ?? null,
    };
  };
  return extractCollection(payload).map(mapSectorApiToSector);
};

export const mapTramitesApi = (payload: CollectionResponse<TramiteApi>): Tramite[] => {
  return extractCollection(payload).map(mapTramiteApiToTramite);
};