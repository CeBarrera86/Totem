import type { BaseSyntheticEvent } from 'react';
import { Typography, Grid } from '@mui/material';

import TarjetaPrincipal from '@/components/tarjeta/TarjetaPrincipal';
import Teclado from '@/components/teclado/Teclado';
import DniForm from '@/components/formulario/DniForm';
import Procesando from '@/components/dialogos/Procesando';
import { useDniInput } from '@/hooks/useDniInput';
import type { DniFormValues } from '@/validations/dniSchema';

interface InnerHomeProps {
  currentDniValue: string;
  onSubmit: (data: DniFormValues, event?: BaseSyntheticEvent) => void;
  isLoading: boolean;
}

const InnerHome = ({ currentDniValue, onSubmit, isLoading }: InnerHomeProps) => {
  const { handleNumberClick, handleBackspace } = useDniInput(10);

  const tituloCard = (
    <Typography variant="h4" fontSize="3.5rem" align="center" color="inherit">
      Bienvenido/a
    </Typography>
  );

  return (
    <>
      <Grid container spacing={4} alignItems="stretch" justifyContent="center" sx={{ width: '100%' }}>
        <Grid item xs={12} md={8}>
          <TarjetaPrincipal titulo={tituloCard}>
            <Typography align="center" variant="h6">
              INGRESE SU DNI
            </Typography>
            <DniForm onSubmit={onSubmit} currentDniValue={currentDniValue} />
          </TarjetaPrincipal>
        </Grid>

        <Grid item xs={12} md={4}>
          <Teclado onNumberClick={handleNumberClick} onBackspace={handleBackspace} />
        </Grid>
      </Grid>

      <Procesando open={isLoading} />
    </>
  );
};

export default InnerHome;