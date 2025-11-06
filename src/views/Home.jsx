import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import ContenedorPrincipal from '../components/layout/ContenedorPrincipal';
import { dniSchema } from '../validations/dniSchema';
import { handleDniSubmit } from '../handlers/handleDniSubmit';
import InnerHome from '../components/pantallas/InnerHome.jsx';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({ resolver: zodResolver(dniSchema), defaultValues: { dni: '' }, mode: 'onSubmit' });
  const { watch } = methods;
  const currentDniValue = watch('dni');
  const onSubmit = async (data, event) => {
    if (event?.currentTarget) event.currentTarget.blur();
    await handleDniSubmit({ dni: data.dni, setIsLoading, navigate });
  };

  return (
    <ContenedorPrincipal>
      <FormProvider {...methods}>
        <InnerHome currentDniValue={currentDniValue} onSubmit={onSubmit} isLoading={isLoading} />
      </FormProvider>
    </ContenedorPrincipal>
  );
};

export default Home;