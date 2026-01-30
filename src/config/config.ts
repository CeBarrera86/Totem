const { VITE_DIR, VITE_PORT, VITE_API_URL, VITE_API_TIMEOUT } = import.meta.env;

const buildBaseUrl = () => {
  if (VITE_API_URL) return VITE_API_URL;
  if (!VITE_DIR) return '';
  if (!VITE_PORT) return VITE_DIR;
  return `${VITE_DIR}:${VITE_PORT}`;
};

const baseUrl = buildBaseUrl();

if (!baseUrl) {
  console.warn('⚠️ Variables de entorno faltantes: VITE_API_URL o VITE_DIR/VITE_PORT');
}

export const config = {
  apiBaseUrl: baseUrl,
  apiPrefix: '/api',
  apiTimeoutMs: Number(VITE_API_TIMEOUT) || 10000,
};