// src/views/Secciones.jsx
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // Importa useTheme

// Importar los componentes y hooks modularizados
import ContenedorPrincipal from '../components/layout/ContenedorPrincipal';
import TarjetaPrincipal from '../components/tarjeta/TarjetaPrincipal';
import BotonVolver from '../components/botones/BotonVolver';
import BotonAccion from '../components/botones/BotonAccion';
import useDatosCliente from '../components/utilidades/useDatosCliente';
import useFetchData from '../components/utilidades/useFetchData';

const Secciones = () => {
  const navigate = useNavigate();
  const cliente = useDatosCliente();
  const theme = useTheme(); // Accede al tema

  const { data: sectors, loading, error } = useFetchData('http://localhost:5144/api/Sector');

  const handleSectionClick = (sectorId) => {
    if (sectorId === 2) {
      navigate('/tramites');
    } else if (sectorId === 1) {
      console.log(`Botón CAJAS (ID ${sectorId}) clickeado. Implementar lógica para Cajas.`);
      alert("Acción para CAJAS aún no implementada.");
    }
  };

  const handleBackClick = () => {
    sessionStorage.removeItem('datosCliente');
    navigate('/');
  };

  const filteredSectors = sectors.filter(sector =>
    sector.padreId === null && (sector.id === 1 || sector.id === 2)
  );

  if (loading) {
    return (
      <ContenedorPrincipal>
        <Typography variant="h5">Cargando secciones... 🔄</Typography>
      </ContenedorPrincipal>
    );
  }

  if (error) {
    return (
      <ContenedorPrincipal>
        <Typography variant="h5" color="error">{error} 😞</Typography>
      </ContenedorPrincipal>
    );
  }

  const clienteNombreCompleto = cliente ? (cliente.titular).trim().toUpperCase() : 'CLIENTE DESCONOCIDO';

  const tituloCard = (
    <Box>
      <Typography
        fontSize="2rem"
        fontWeight="bold"
        align="center"
        color="inherit"
        sx={{ lineHeight: 1.2 }}
      >
        Bienvenido/a
      </Typography>
      <Typography
        fontSize="2rem"
        align="center"
        color="inherit"
        sx={{ mt: 1, lineHeight: 1.2 }}
      >
        {clienteNombreCompleto}
      </Typography>
    </Box>
  );

  return (
    <ContenedorPrincipal>
      <Grid
        container
        spacing={4}
        alignItems="stretch"
        justifyContent="center"
        sx={{ width: '100%', height: '100%' }}
      >
        <Grid item xs={12} md={8}>
          <TarjetaPrincipal titulo={tituloCard}>
            <Typography
              align="center"
              variant="h6"
              sx={{ color: theme.palette.text.primary }} // Usando color del tema
            >
              SACAR TURNO PARA:
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '100%',
              }}
            >
              {filteredSectors.map((sector) => (
                <BotonAccion
                  key={sector.id}
                  sx={{
                    height: '170px',
                    flexGrow: 1,
                    flexBasis: { xs: '100%', sm: 'calc(50% - 16px)' },
                    maxWidth: { xs: '100%', sm: 'calc(50% - 16px)' },
                    fontSize: sector.nombre.toUpperCase() === 'CAJAS' ? '60px' : '40px',
                  }}
                  onClick={() => handleSectionClick(sector.id)}
                >
                  {sector.nombre}
                </BotonAccion>
              ))}
            </Box>

            <BotonVolver onClick={handleBackClick} />
          </TarjetaPrincipal>
        </Grid>
      </Grid>
    </ContenedorPrincipal>
  );
};

export default Secciones;