import React, { useState } from 'react';
import axios from 'axios';
import { Typography, Grid, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTheme } from '@mui/material/styles';
import BotonAccion from '../components/botones/BotonAccion';
import Procesando from '../components/dialogos/Procesando';
import DniInput from '../components/input/Dni';
import ContenedorPrincipal from '../components/layout/ContenedorPrincipal';
import TarjetaPrincipal from '../components/tarjeta/TarjetaPrincipal';
import Teclado from '../components/teclado/Teclado';

const dniSchema = z.object({
  dni: z.string()
    .min(7, "DNI mínimo 7 dígitos.")
    .max(10, "DNI máximo 10 dígitos.")
    .regex(/^\d+$/, "Solo números.")
});

const Home = () => {
  const DNI_MAX_LENGTH = 10;
  const navigate = useNavigate();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
    clearErrors
  } = useForm({
    resolver: zodResolver(dniSchema),
    defaultValues: { dni: '' },
    mode: 'onSubmit'
  });
  const currentDniValue = watch('dni');

  const handleNumberClick = (num) => {
    if (errors.dni) {
      clearErrors('dni');
    }
    const currentValue = getValues('dni') || '';
    if (currentValue.length < DNI_MAX_LENGTH) {
      setValue('dni', currentValue + num, { shouldValidate: false, shouldDirty: true });
    }
  };

  const handleBackspace = () => {
    if (errors.dni) {
      clearErrors('dni');
    }
    const currentValue = getValues('dni') || '';
    setValue('dni', currentValue.slice(0, -1), { shouldValidate: false, shouldDirty: true });
  };

  const onSubmit = async (data, event) => {
    if (event && event.currentTarget) {
      event.currentTarget.blur();
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5144/api/Cliente/${data.dni}`);
      const clienteData = response.data;
      sessionStorage.setItem('datosCliente', JSON.stringify(clienteData));

      setTimeout(() => {
        setIsLoading(false);
        navigate('/secciones');
      }, 500);

    } catch (error) {
      console.error("Error al consultar la API:", error);
      sessionStorage.removeItem('datosCliente');

      setTimeout(() => {
        setIsLoading(false);
        if (error.response) {
          alert(`Error: No se pudo encontrar el cliente con DNI ${data.dni}. (Status: ${error.response.status})`);
        } else if (error.request) {
          alert("Error de conexión: No se pudo comunicar con el servidor. Verifica que la API esté en línea.");
        } else {
          alert("Ocurrió un error inesperado al realizar la consulta.");
        }
      }, 500);
    }
  };

  return (
    <ContenedorPrincipal>
      <Grid container spacing={4} alignItems="stretch" justifyContent="center" sx={{ width: '100%' }} >
        <Grid size={{ xs: 12, md: 8 }}>
          <TarjetaPrincipal
            titulo={
              <Typography variant="h4" fontSize="3.5rem" align="center" color="inherit" >
                Bienvenido/a
              </Typography>
            } >
            <Typography align="center" variant="h6">
              INGRESE SU DNI
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off"
              style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }} >
              <Box
                sx={{
                  bgcolor: theme.palette.success.dark,
                  borderRadius: 2,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }} >
                <DniInput control={control} errors={errors} currentDniValue={currentDniValue} />
                <BotonAccion type="submit" buttonColor="warning"
                  sx={{ fontSize: '1.5rem', width: 'auto', minWidth: '300px', letterSpacing: '0.1em', }} >
                  CONTINUAR
                </BotonAccion>
              </Box>
            </form>
          </TarjetaPrincipal>
        </Grid>
        {/* TECLADO */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Teclado onNumberClick={handleNumberClick} onBackspace={handleBackspace} />
        </Grid>
      </Grid>
      <Procesando open={isLoading} />
    </ContenedorPrincipal>
  );
};

export default Home;