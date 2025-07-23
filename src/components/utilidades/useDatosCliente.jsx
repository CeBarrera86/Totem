// src/components/utilidades/useDatosCliente.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useDatosCliente = () => {
  const [cliente, setCliente] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCliente = sessionStorage.getItem('datosCliente');
    if (storedCliente) {
      try {
        setCliente(JSON.parse(storedCliente));
      } catch (e) {
        console.error("Error al parsear datos del cliente de sessionStorage:", e);
        sessionStorage.removeItem('datosCliente');
        navigate('/'); // Redirigir si los datos están corruptos
      }
    } else {
      console.warn("No se encontraron datos del cliente en sessionStorage.");
      navigate('/'); // Redirigir si no hay datos de cliente
    }
  }, [navigate]);

  return cliente;
};

export default useDatosCliente;