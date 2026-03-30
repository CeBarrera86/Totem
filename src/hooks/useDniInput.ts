import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import type { DniFormValues } from '@/validations/dniSchema';

export const useDniInput = (maxLength = 10) => {
  const {
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<DniFormValues>();

  const handleNumberClick = useCallback((num: string) => {
    if (errors.dni) {clearErrors('dni');}
    const currentValue = getValues('dni') || '';
    if (currentValue.length < maxLength) {
      setValue('dni', currentValue + num, { shouldValidate: false, shouldDirty: true });
    }
  }, [clearErrors, errors.dni, getValues, maxLength, setValue]);

  const handleBackspace = useCallback(() => {
    if (errors.dni) {clearErrors('dni');}
    const currentValue = getValues('dni') || '';
    setValue('dni', currentValue.slice(0, -1), { shouldValidate: false, shouldDirty: true });
  }, [clearErrors, errors.dni, getValues, setValue]);

  return { handleNumberClick, handleBackspace };
};