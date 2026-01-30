import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

import { config } from '@/config/config';

const API_KEY = import.meta.env.VITE_API_KEY as string | undefined;

const joinUrl = (base: string, path: string) => {
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

export const httpClient = axios.create({
  baseURL: joinUrl(config.apiBaseUrl, config.apiPrefix),
  timeout: config.apiTimeoutMs,
  headers: API_KEY ? { 'X-Api-Key': API_KEY } : undefined,
});

type RetryableConfig = AxiosRequestConfig & { __retry?: boolean };

const shouldRetry = (error: AxiosError) => {
  if (error.code === 'ECONNABORTED') return true;
  if (!error.response) return true;
  return false;
};

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryableConfig | undefined;
    const method = config?.method?.toLowerCase();
    const isGet = method === 'get';

    if (config && isGet && !config.__retry && shouldRetry(error)) {
      config.__retry = true;
      return httpClient(config);
    }

    if (typeof window !== 'undefined') {
      const detail = {
        message: normalizeApiError(error, 'Error de conexión con el servidor.'),
        status: error.response?.status ?? null,
      };
      window.dispatchEvent(new CustomEvent('api-error', { detail }));
    }

    return Promise.reject(error);
  }
);

const hasMessage = (data: unknown): data is { message?: string } => {
  return typeof data === 'object' && data !== null && 'message' in data;
};

export const normalizeApiError = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.code === 'ECONNABORTED') {
      return 'Tiempo de espera agotado al conectar con el servidor.';
    }
    if (!axiosError.response) {
      return 'No se pudo conectar con el servidor.';
    }
    const data = axiosError.response?.data;
    if (hasMessage(data) && data.message) {
      return data.message;
    }
    if (axiosError.message) return axiosError.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};