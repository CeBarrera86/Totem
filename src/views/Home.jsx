// src/views/Home.jsx
import React from 'react';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Grid
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTheme } from '@mui/material/styles'; // Importa useTheme

// Importar el único componente de layout
import ContenedorPrincipal from '../components/layout/ContenedorPrincipal';
import Teclado from '../components/teclado/Teclado';
import DniInput from '../components/input/Dni';
import TarjetaPrincipal from '../components/tarjeta/TarjetaPrincipal'; // Asegúrate de importar TarjetaPrincipal

const dniSchema = z.object({
  dni: z.string()
    .min(7, "DNI mínimo 7 dígitos.")
    .max(10, "DNI máximo 10 dígitos.")
    .regex(/^\d+$/, "Solo números.")
});

const Home = () => {
  const DNI_MAX_LENGTH = 10;
  const navigate = useNavigate();
  const theme = useTheme(); // Accede al tema

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(dniSchema),
    defaultValues: { dni: '' },
    mode: 'onChange'
  });

  const currentDniValue = watch('dni');

  const handleNumberClick = (num) => {
    const currentValue = getValues('dni') || '';
    if (currentValue.length < DNI_MAX_LENGTH) {
      setValue('dni', currentValue + num, { shouldValidate: true, shouldDirty: true });
    }
  };

  const handleBackspace = () => {
    const currentValue = getValues('dni') || '';
    setValue('dni', currentValue.slice(0, -1), { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data) => {
    console.log("DNI Validado para la consulta:", data.dni);

    try {
      const response = await axios.get(`http://localhost:5144/api/Cliente/${data.dni}`);
      const clienteData = response.data;
      console.log("Respuesta de la API recibida:", clienteData);

      sessionStorage.setItem('datosCliente', JSON.stringify(clienteData));
      navigate('/secciones');

    } catch (error) {
      console.error("Error al consultar la API:", error);
      sessionStorage.removeItem('datosCliente');

      if (error.response) {
        alert(`Error: No se pudo encontrar el cliente con DNI ${data.dni}. (Status: ${error.response.status})`);
      } else if (error.request) {
        alert("Error de conexión: No se pudo comunicar con el servidor. Verifica que la API esté en línea.");
      } else {
        alert("Ocurrió un error inesperado al realizar la consulta.");
      }
    }
  };

  return (
    <ContenedorPrincipal>
      <Grid
        container
        spacing={4}
        alignItems="stretch"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        {/* Usando TarjetaPrincipal para la tarjeta principal */}
        <Grid item xs={12} md={8}>
          <TarjetaPrincipal
            titulo={
              <Typography
                variant="h4"
                fontSize="3.5rem"
                fontWeight="bold"
                align="center"
                color="inherit"
              >
                Bienvenido/a
              </Typography>
            }
          >
            <Typography align="center" fontWeight="bold" variant="h6">
              INGRESE SU DNI
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'space-between'
              }}
            >
              <DniInput control={control} errors={errors} currentDniValue={currentDniValue} />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: theme.palette.warning.main, // Usando color del tema
                  color: theme.palette.warning.contrastText, // Usando color del tema
                  fontSize: '1.5rem',
                  borderRadius: 2,
                  '&:hover': { bgcolor: theme.palette.warning.dark }, // Usando color del tema
                  width: 'auto',
                  minWidth: '300px',
                }}
              >
                Continuar
              </Button>
            </form>
          </TarjetaPrincipal>
        </Grid>
        {/* TECLADO */}
        <Grid item xs={12} md={4}>
          <Teclado onNumberClick={handleNumberClick} onBackspace={handleBackspace} />
        </Grid>
      </Grid>
    </ContenedorPrincipal>
  );
};

export default Home;