import type { Cliente } from '@/models/cliente';

const SESSION_CLIENT_KEY = 'datosCliente';

export const saveClienteSession = (cliente: Cliente) => {
  sessionStorage.setItem(SESSION_CLIENT_KEY, JSON.stringify(cliente));
};

export const getClienteSession = (): Cliente | null => {
  const storedCliente = sessionStorage.getItem(SESSION_CLIENT_KEY);

  if (!storedCliente) {
    return null;
  }

  try {
    return JSON.parse(storedCliente) as Cliente;
  } catch {
    sessionStorage.removeItem(SESSION_CLIENT_KEY);
    return null;
  }
};

export const clearClienteSession = () => {
  sessionStorage.removeItem(SESSION_CLIENT_KEY);
};
