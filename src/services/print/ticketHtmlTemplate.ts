// Generador de HTML para ticket
import type { Ticket } from '@/models/ticket';

import { PRINT_TITLE, TICKET_LAYOUT, TICKET_LOGO } from './ticketPrintConstants';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const resolveTicketCode = (ticket: Ticket) => {
  const directCode = ticket.data?.toString().trim();
  if (directCode) { return directCode; }
  return `${ticket.letra ?? ''}${ticket.numero ?? ''}`.trim() || '-';
};

export function buildPrintableHtml(ticket: Ticket) {
  const code = escapeHtml(resolveTicketCode(ticket));
  const enEspera = escapeHtml(ticket.enEspera?.toString() ?? '-');
  const fecha = new Date().toLocaleDateString('es-AR');
  const hora = new Date().toLocaleTimeString('es-AR');
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${PRINT_TITLE}</title>
  <style>${TICKET_LAYOUT}</style>
</head>
<body>
  <main class="ticket">
    <div class="logo">
      <img src="${TICKET_LOGO}" alt="Logo Corpico" />
    </div>
    <div class="main">
      <div class="code">${code}</div>
      <div class="en-espera-label">En espera: <span class="en-espera">${enEspera}</span></div>
    </div>
    <div class="footer">
      <div class="footer-col left">
        <div class="footer-line">Sitio: www.corpico.com.ar</div>
        <div class="footer-line">App: corpico-digital.corpico.com.ar</div>
      </div>
      <div class="footer-col right">
        <div class="footer-line">${fecha}</div>
        <div class="footer-line">${hora}</div>
      </div>
    </div>
  </main>
</body>
</html>`;
}
