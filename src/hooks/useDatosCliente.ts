import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Cliente } from '@/models/cliente';
import { getClienteSession } from '@/services/sessionClienteStorage';

const useDatosCliente = () => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCliente = getClienteSession();

    if (!storedCliente) {
      console.warn('No se encontraron datos del cliente en sessionStorage.');
      navigate('/');
      return;
    }

    setCliente(storedCliente);
  }, [navigate]);

  return cliente;
};

export default useDatosCliente;