import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Cliente } from '@/models/cliente';

const useDatosCliente = () => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCliente = sessionStorage.getItem('datosCliente');
    if (storedCliente) {
      try {
        setCliente(JSON.parse(storedCliente) as Cliente);
      } catch (e) {
        console.error('Error al parsear datos del cliente de sessionStorage:', e);
        sessionStorage.removeItem('datosCliente');
        navigate('/');
      }
    } else {
      console.warn('No se encontraron datos del cliente en sessionStorage.');
      navigate('/');
    }
  }, [navigate]);

  return cliente;
};

export default useDatosCliente;