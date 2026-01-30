import type { BaseSyntheticEvent } from 'react';
import { Box, Typography, Grid } from '@mui/material';

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
    <Typography
      variant="h4"
      align="center"
      color="inherit"
      sx={{ fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' } }}
    >
      Bienvenido/a
    </Typography>
  );

  return (
    <>
      <Grid container spacing={3} alignItems="stretch" justifyContent="center" sx={{ width: '100%' }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 560, md: 720 }, mx: 'auto' }}>
            <TarjetaPrincipal titulo={tituloCard}>
              <Typography align="center" variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}>
                INGRESE SU DNI
              </Typography>
              <DniForm onSubmit={onSubmit} currentDniValue={currentDniValue} />
            </TarjetaPrincipal>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 560, md: 720 }, mx: 'auto' }}>
            <Teclado onNumberClick={handleNumberClick} onBackspace={handleBackspace} />
          </Box>
        </Grid>
      </Grid>

      <Procesando open={isLoading} />
    </>
  );
};

export default InnerHome;