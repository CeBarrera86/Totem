import { useEffect, useState } from 'react';

type ApiErrorDetail = {
  message: string;
  status: number | null;
};

export const useGlobalApiError = () => {
  const [error, setError] = useState<ApiErrorDetail | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<ApiErrorDetail>;
      setError(customEvent.detail);
    };

    window.addEventListener('api-error', handler);
    return () => window.removeEventListener('api-error', handler);
  }, []);

  const clearError = () => setError(null);

  return { error, clearError };
};