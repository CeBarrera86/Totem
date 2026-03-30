// Generador de ESC/POS para ticket
import type { Ticket } from '@/models/ticket';

import { escposImageFromUrl } from '../escposImage';
import { TICKET_LOGO } from './ticketPrintConstants';

const ESC = '\x1B';
const GS = '\x1D';

const resolveTicketCode = (ticket: Ticket) => {
  const directCode = ticket.data?.toString().trim();
  if (directCode) { return directCode; }
  return `${ticket.letra ?? ''}${ticket.numero ?? ''}`.trim() || '-';
};

export async function buildRawEscPos(ticket: Ticket) {
  let logoCmd = '';
  try {
    logoCmd = await escposImageFromUrl(TICKET_LOGO);
  } catch { logoCmd = ''; }
  const code = resolveTicketCode(ticket);
  const enEspera = ticket.enEspera ?? '-';
  const fecha = new Date().toLocaleDateString('es-AR');
  const hora = new Date().toLocaleTimeString('es-AR');
  const sitio = 'Sitio: www.corpico.com.ar';
  const app = 'App: corpico-digital.corpico.com.ar';
  const ancho = 42;
  const padLeft = (str: string, len: number) => ' '.repeat(Math.max(0, len - str.length)) + str;
  const footer1 = sitio + padLeft(fecha, ancho - sitio.length);
  const footer2 = app + padLeft(hora, ancho - app.length);
  return [
    `${ESC}@`,
    `${ESC}a\x00`,
    logoCmd,
    '\n',
    `${ESC}a\x01${ESC}E\x01${GS}!\x11${code}${GS}!\x00${ESC}E\x00\n`,
    `${ESC}a\x01${GS}!\x01En espera: ${enEspera}${GS}!\x00\n`,
    '\n',
    `${ESC}a\x00`,
    `${footer1}\n${footer2}\n`,
    '\n\n',
    `${GS}V\x00`,
  ].join('');
}
