// Generador de ESC/POS para ticket
import type { Ticket } from '@/models/ticket';

import { escposImageFromUrl } from '../escposImage';

const logo = '/src/assets/img/corp_log.png'; // Ruta del logo a imprimir
const ESC = '\x1B';
const GS = '\x1D';


// Devuelve el código del ticket (ej: "C10")
const resolveTicketCode = (ticket: Ticket) => ticket.ticket || '-';

export async function buildRawEscPos(ticket: Ticket) {
  // Puedes ajustar el threshold (umbral) y dithering aquí para experimentar visualmente
  const threshold = 100; // Prueba valores entre 100 y 180 según el logo
  const dithering = true; // true = Floyd-Steinberg, false = binario simple
  let logoCmd = '';
  try {
    logoCmd = await escposImageFromUrl(logo, threshold, dithering);
  } catch { logoCmd = ''; }
  const code = resolveTicketCode(ticket);
  const enEspera = ticket.enEspera ?? '-';
  const fecha = new Date().toLocaleDateString('es-AR');
  const hora = new Date().toLocaleTimeString('es-AR');
  const sitio = 'Sitio: www.corpico.com.ar';
  const app = 'App: corpico-digital.corpico.com.ar';
  const anchoFooter = 42;
  const padFooter = (izq: string, der: string, extra = 0) => {
    const espacios = Math.max(0, anchoFooter - izq.length - der.length) + extra;
    return izq + ' '.repeat(espacios) + der;
  };
  return [
    `${ESC}@`, // Reset
    `${ESC}a\x00`, // Izquierda
    logoCmd,
    `${ESC}a\x01`, // Centrar
    `${ESC}d\x01`, // feed(1)
    // Código: tamaño máximo (6x6), negrita ON
    `${GS}!\x66${ESC}E\x01${code}${ESC}E\x00${GS}!\x00\n`,
    `${ESC}d\x01`, // feed(1)
    // "En espera": tamaño grande (2x2), negrita OFF
    `${GS}!\x11${ESC}E\x00En espera: ${enEspera}${GS}!\x00\n`,
    `${ESC}d\x01`, // feed(1)
    // Footer: fuente B, tamaño normal, alineado a la izquierda
    `${ESC}a\x00${ESC}M\x01${GS}!\x00`,
    padFooter(sitio, fecha, 20) + '\n', // 20 espacios
    padFooter(app, hora, 19) + '\n', // 19 espacios
    `${ESC}M\x00`, // Fuente A de nuevo (opcional)
    `${ESC}d\x03`, // feed(3)
    `${GS}V\x00`, // Corte
  ].join('');
}

/*
---------------------------------------------
Parámetros y comandos utilizados en buildRawEscPos
---------------------------------------------

    ${ESC}@         // Inicializa/reset la impresora
    ${ESC}a\x01     // Alinear al centro
    ${ESC}a\x00     // Alinear a la izquierda
    ${ESC}d\x01     // Avanzar 1 línea (feed)
    ${ESC}d\x03     // Avanzar 3 líneas (feed largo)
    ${GS}!\x66      // Tamaño de fuente máximo (6x6). Opciones:
                    //   \x00: normal, \x11: 2x2, \x22: 3x3, ..., \x66: 6x6, \x77: 7x7 (no todas las impresoras soportan 7x7)
    ${GS}!\x11      // Tamaño de fuente grande (2x2)
    ${GS}!\x00      // Tamaño de fuente normal
    ${ESC}E\x01     // Negrita ON
    ${ESC}E\x00     // Negrita OFF
    ${ESC}M\x01     // Fuente B (más angosta)
    ${ESC}M\x00     // Fuente A (por defecto)
    ${GS}V\x00      // Corte total de papel

    Notas:
    - El comando ${GS}!n (\x1D!n) controla el tamaño de fuente:
        n = 0x00: normal
        n = 0x11: doble ancho y alto (2x2)
        n = 0x22: triple (3x3)
        n = 0x33: 4x4, ... hasta 0x77 (7x7, máximo)
        n = 0x66: 6x6 (usado aquí para máxima compatibilidad)
    - ${ESC}M\x01 activa fuente B (más angosta), ${ESC}M\x00 vuelve a fuente A.
    - ${ESC}a\x01 centra, ${ESC}a\x00 alinea a la izquierda.
    - ${ESC}d\x01 avanza 1 línea, ${ESC}d\x03 avanza 3 líneas.
    - ${GS}V\x00 realiza el corte total del papel.
    - Para imágenes, códigos de barras y QR, la secuencia suele ser más compleja.
    - \x1B = ESC, \x1D = GS.
    - Esta tabla es solo referencia rápida, no exhaustiva.
*/
