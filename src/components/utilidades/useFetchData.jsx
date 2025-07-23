// src/components/utilidades/useFetchData.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError("No se pudieron cargar los datos. Por favor, intente de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, ...dependencies]);

  return { data, loading, error };
};

export default useFetchData;