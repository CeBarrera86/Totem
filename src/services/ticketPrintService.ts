
import qz from 'qz-tray';

import { config } from '@/config/config';
import type { Ticket } from '@/models/ticket';

import { setupQzSecurity } from './print/qzSecurity';
import { buildRawEscPos } from './print/ticketEscposTemplate';
import { buildPrintableHtml } from './print/ticketHtmlTemplate';

let qzUnavailableInSession = false;
let qzConnectionPromise: Promise<void> | null = null;

// Inicializar seguridad QZ al cargar el módulo
setupQzSecurity();

const printWithBrowser = async (ticket: Ticket) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('La impresion solo esta disponible en el navegador.');
  }

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.right = '0';
  iframe.style.bottom = '0';

  document.body.appendChild(iframe);

  const cleanup = () => {
    iframe.remove();
  };

  const printFrame = () => {
    const printWindow = iframe.contentWindow;
    if (!printWindow) {
      cleanup();
      throw new Error('No se pudo abrir el contexto de impresion.');
    }

    printWindow.focus();
    printWindow.print();
    window.setTimeout(cleanup, 300);
  };

  return new Promise<void>((resolve, reject) => {
    try {
      iframe.onload = () => {
        try {
          printFrame();
          resolve();
        } catch (error) {
          cleanup();
          reject(error instanceof Error ? error : new Error('Error al imprimir ticket.'));
        }
      };

      iframe.srcdoc = buildPrintableHtml(ticket);
    } catch (error) {
      cleanup();
      reject(error instanceof Error ? error : new Error('Error al preparar impresion del ticket.'));
    }
  });
};

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
    await printWithBrowser(ticket);
    return;
  }
  if (qzUnavailableInSession) {
    await printWithBrowser(ticket);
    return;
  }
  try {
    await printWithQzAgent(ticket);
  } catch (error) {
    console.warn('Impresion directa no disponible. Se usa impresion de navegador.', error);
    qzUnavailableInSession = true;
    await printWithBrowser(ticket);
  }
};
