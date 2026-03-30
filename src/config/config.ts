const {
  VITE_DIR,
  VITE_PORT,
  VITE_API_URL,
  VITE_API_TIMEOUT,
  VITE_PRINT_MODE,
  VITE_PRINT_PRINTER_NAME,
} = import.meta.env;

export type PrintMode = 'auto' | 'agent' | 'browser';

const buildBaseUrl = () => {
  if (VITE_API_URL) {return VITE_API_URL;}
  if (!VITE_DIR) {return '';}
  if (!VITE_PORT) {return VITE_DIR;}
  return `${VITE_DIR}:${VITE_PORT}`;
};

const baseUrl = buildBaseUrl();

const resolvePrintMode = (): PrintMode => {
  const mode = VITE_PRINT_MODE?.toLowerCase();
  if (mode === 'agent' || mode === 'browser' || mode === 'auto') {
    return mode;
  }
  if (import.meta.env.DEV) {
    return 'browser';
  }
  return 'auto';
};

if (!baseUrl) {
  console.warn('⚠️ Variables de entorno faltantes: VITE_API_URL o VITE_DIR/VITE_PORT');
}

export const config = {
  apiBaseUrl: baseUrl,
  apiPrefix: '/api',
  apiTimeoutMs: Number(VITE_API_TIMEOUT) || 10000,
  printMode: resolvePrintMode(),
  printPrinterName: VITE_PRINT_PRINTER_NAME?.trim() || 'EPSON TM-T20III',
};