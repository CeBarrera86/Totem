import { useFormContext } from 'react-hook-form';

export const useDniInput = (maxLength = 10) => {
  const { getValues, setValue, clearErrors, formState: { errors } } = useFormContext();

  const handleNumberClick = (num) => {
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
