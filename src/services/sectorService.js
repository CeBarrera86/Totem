import { config } from '../config/config';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Sector`;

export const getSectores = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Error al obtener sectores');
  return await res.json();
};
