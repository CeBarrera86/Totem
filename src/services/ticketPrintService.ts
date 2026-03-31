
import qz from 'qz-tray';

import { config } from '@/config/config';
import type { Ticket } from '@/models/ticket';

import { setupQzSecurity } from './print/qzSecurity';
import { buildRawEscPos } from './print/ticketEscposTemplate';

let qzUnavailableInSession = false;
let qzConnectionPromise: Promise<void> | null = null;

// Inicializar seguridad QZ al cargar el módulo
setupQzSecurity();

// Eliminado: función printWithBrowser (visualización HTML)

const ensureQzConnection = async () => {
  if (qzUnavailableInSession) {
    throw new Error('QZ no disponible en esta sesion.');
  }

  if (!qz.websocket.isActive()) {
    if (!qzConnectionPromise) {
      qzConnectionPromise = qz.websocket
        .connect({ retries: 0 })
        .then(() => {
          qzUnavailableInSession = false;
        })
        .catch((error: unknown) => {
          qzUnavailableInSession = true;
          throw error;
        })
        .finally(() => {
          qzConnectionPromise = null;
        });
    }

    await qzConnectionPromise;
  }
};

const printWithQzAgent = async (ticket: Ticket) => {
  await ensureQzConnection();
  const printerConfig = qz.configs.create(config.printPrinterName, {
    copies: 1,
    jobName: 'Ticket Totem',
  });
  const payload = await buildRawEscPos(ticket); // Esperar el string ESC/POS
  await qz.print(printerConfig, [{ type: 'raw', format: 'plain', data: payload }]);
};

export const printTicket = async (ticket: Ticket) => {
  const mode = config.printMode;
  if (mode === 'agent') {
    await printWithQzAgent(ticket);
    return;
  }
  if (mode === 'browser') {
    // Eliminado: impresión visual con printWithBrowser
    return;
  }
  if (qzUnavailableInSession) {
    // Eliminado: impresión visual con printWithBrowser
    return;
  }
  try {
    await printWithQzAgent(ticket);
  } catch (error) {
    console.warn('Impresion directa no disponible. Se usa impresion de navegador.', error);
    qzUnavailableInSession = true;
    // Eliminado: impresión visual con printWithBrowser
  }
};
