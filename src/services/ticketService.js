import { config } from '../config/config';

const BASE_URL = `${config.urlBase}${config.apiPrefix}/Ticket`;

// export const generarTicket = async (dni, sectorId) => {
export const generarTicket = async (clienteId, sectorId) => {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify({ dni, sectorId })
    body: JSON.stringify({ clienteId, sectorIdOrigen: sectorId })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al generar ticket');
  }
  return await res.json();
};
