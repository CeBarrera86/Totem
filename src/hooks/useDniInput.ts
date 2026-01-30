import { useFormContext } from 'react-hook-form';
import type { DniFormValues } from '@/validations/dniSchema';

export const useDniInput = (maxLength = 10) => {
  const {
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<DniFormValues>();

  const handleNumberClick = (num: string) => {
    if (errors.dni) clearErrors('dni');
    const currentValue = getValues('dni') || '';
    if (currentValue.length < maxLength) {
      setValue('dni', currentValue + num, { shouldValidate: false, shouldDirty: true });
    }
  };

  const handleBackspace = () => {
    if (errors.dni) clearErrors('dni');
    const currentValue = getValues('dni') || '';
    setValue('dni', currentValue.slice(0, -1), { shouldValidate: false, shouldDirty: true });
  };

  return { handleNumberClick, handleBackspace };
};