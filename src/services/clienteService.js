import { config } from '../config/config';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Cliente`;

export const getClientePorDni = async (dni) => {
  const res = await fetch(`${BASE_URL}/${dni}`);
  if (!res.ok) throw new Error(`No se encontró el cliente con DNI ${dni}`);
  return await res.json();
};
