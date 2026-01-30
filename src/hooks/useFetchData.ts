import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { httpClient } from '@/services/httpClient';

export const useFetchData = <T,>(url: string, dependencies: unknown[] = []) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const depKey = useMemo(() => JSON.stringify(dependencies), [dependencies]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const isAbsoluteUrl = /^https?:\/\//i.test(url);
        const response = isAbsoluteUrl ? await axios.get<T[]>(url) : await httpClient.get<T[]>(url);
        setData(response.data);
      } catch (err) {
        console.error('Error al obtener datos:', err);
        setError('No se pudieron cargar los datos. Por favor, intente de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, depKey]);

  return { data, loading, error };
};