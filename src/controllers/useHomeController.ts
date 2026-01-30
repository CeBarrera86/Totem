import { useState, type BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { dniSchema, type DniFormValues } from '@/validations/dniSchema';
import { handleDniSubmit } from '@/handlers/handleDniSubmit';

export const useHomeController = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<DniFormValues>({
    resolver: zodResolver(dniSchema),
    defaultValues: { dni: '' },
    mode: 'onSubmit',
  });
  const { watch } = methods;
  const currentDniValue = watch('dni');

  const onSubmit = async (data: DniFormValues, event?: BaseSyntheticEvent) => {
    if (event?.currentTarget) event.currentTarget.blur();
    await handleDniSubmit({ dni: data.dni, setIsLoading, navigate });
  };

  return { methods, currentDniValue, isLoading, onSubmit };
};