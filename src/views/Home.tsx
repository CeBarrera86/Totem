import { FormProvider } from 'react-hook-form';

import ContenedorPrincipal from '@/components/layout/ContenedorPrincipal';
import InnerHome from '@/components/pantallas/InnerHome';
import { useHomeController } from '@/controllers/useHomeController';

const Home = () => {
  const { methods, currentDniValue, isLoading, apiError, onSubmit } = useHomeController();

  return (
    <ContenedorPrincipal>
      <FormProvider {...methods}>
        <InnerHome currentDniValue={currentDniValue} onSubmit={onSubmit} isLoading={isLoading} apiError={apiError} />
      </FormProvider>
    </ContenedorPrincipal>
  );
};

export default Home;