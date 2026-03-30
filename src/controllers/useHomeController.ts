import { zodResolver } from '@hookform/resolvers/zod';
import { type BaseSyntheticEvent,useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { getClientePorDni } from '@/services/clienteService';
import { clearClienteSession, saveClienteSession } from '@/services/sessionClienteStorage';
import { type DniFormValues,dniSchema } from '@/validations/dniSchema';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useHomeController = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const methods = useForm<DniFormValues>({
    resolver: zodResolver(dniSchema),
    defaultValues: { dni: '' },
    mode: 'onSubmit',
  });
  const { watch } = methods;
  const currentDniValue = watch('dni');

  useEffect(() => {
    if (apiError) {
      setApiError('');
    }
  }, [currentDniValue, apiError]);

  const onSubmit = async (data: DniFormValues, event?: BaseSyntheticEvent) => {
    if (event?.currentTarget) {event.currentTarget.blur();}

    setIsLoading(true);
    setApiError('');

    try {
      const clienteData = await getClientePorDni(data.dni);
      saveClienteSession(clienteData);
      await wait(500);
      navigate('/secciones');
    } catch (error) {
      clearClienteSession();
      await wait(500);
      setApiError(error instanceof Error ? error.message : 'Ocurrio un error inesperado al realizar la consulta.');
    } finally {
      setIsLoading(false);
    }
  };

  return { methods, currentDniValue, isLoading, apiError, onSubmit };
};