import React from 'react';
import { Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import TarjetaPrincipal from '../tarjeta/TarjetaPrincipal';
import Teclado from '../teclado/Teclado';
import DniForm from '../formulario/DniForm';
import Procesando from '../dialogos/Procesando';
import { useDniInput } from '../../hooks/useDniInput';

const InnerHome = ({ currentDniValue, onSubmit, isLoading }) => {
  const theme = useTheme();
  const { handleNumberClick, handleBackspace } = useDniInput(10);

  return (
    <>
      <Grid container spacing={4} alignItems="stretch" justifyContent="center" sx={{ width: '100%' }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TarjetaPrincipal
            titulo={
              <Typography variant="h4" fontSize="3.5rem" align="center" color="inherit">
                Bienvenido/a
              </Typography>
            }
          >
            <Typography align="center" variant="h6">
              INGRESE SU DNI
            </Typography>
            <DniForm onSubmit={onSubmit} currentDniValue={currentDniValue} />
          </TarjetaPrincipal>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Teclado onNumberClick={handleNumberClick} onBackspace={handleBackspace} />
        </Grid>
      </Grid>

      <Procesando open={isLoading} />
    </>
  );
};

export default InnerHome;
