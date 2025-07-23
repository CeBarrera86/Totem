import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ContenedorPrincipal from '../components/layout/ContenedorPrincipal';
import TarjetaPrincipal from '../components/tarjeta/TarjetaPrincipal';
import BotonVolver from '../components/botones/BotonVolver';
import BotonAccion from '../components/botones/BotonAccion';
import useDatosCliente from '../components/utilidades/useDatosCliente';
import useFetchData from '../components/utilidades/useFetchData';

const Tramites = () => {
  const navigate = useNavigate();
  const cliente = useDatosCliente();
  const theme = useTheme();
  const { data: sectores, loading, error } = useFetchData('http://localhost:5144/api/Sector');
  const handleTramiteClick = (tramiteId) => {
    console.log(`Trámite con ID ${tramiteId} clickeado`);
    alert(`Trámite ${tramiteId} seleccionado. Implementar lógica de turno.`);
  };
  const handleBackClick = () => {
    navigate('/secciones');
  };
  const usuarios = sectores.filter(t => t.padreId === 3);
  const reclamos = sectores.filter(t => t.padreId === 4);

  if (loading) {
    return (
      <ContenedorPrincipal>
        <Typography variant="h5">Cargando trámites... 🔄</Typography>
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

  const titular = cliente ? (cliente.titular).trim().toUpperCase() : 'CLIENTE DESCONOCIDO';

  const tituloCard = (
    <Box>
      <Typography fontSize="2rem" align="center" color="inherit" sx={{ mt: 1, lineHeight: 1.2 }}>
        {titular}
      </Typography>
    </Box>
  );

  const subTituloCard = (
    <Typography align="center" variant="h6" color="inherit" sx={{ opacity: 0.8 }}>
      Seleccione su trámite
    </Typography>
  );

  return (
    <ContenedorPrincipal>
      <Grid container justifyContent="center">
        <Grid item xs={12} sx={{ minWidth: '1300px', width: '100%' }}>
          <TarjetaPrincipal
            titulo={tituloCard}
            subtitulo={subTituloCard}
          >
            <Grid container spacing={2} justifyContent="center" alignItems="stretch" sx={{ mb: 2 }}>
              {/* Columna Izquierda: USUARIOS */}
              <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {usuarios.length > 0}
                {usuarios.map((tramite) => (
                  <BotonAccion
                    key={tramite.id}
                    sx={{
                      width: '600px',
                      height: '80px',
                      fontSize: '27px',
                      mb: 2,
                    }}
                    onClick={() => handleTramiteClick(tramite.id)}
                  >
                    {tramite.descripcion}
                  </BotonAccion>
                ))}
              </Grid>
              {/* Columna Derecha: RECLAMOS */}
              <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {reclamos.length > 0}
                {reclamos.map((tramite) => (
                  <BotonAccion
                    key={tramite.id}
                    sx={{
                      width: '600px',
                      height: '80px',
                      fontSize: '27px',
                      mb: 2,
                    }}
                    onClick={() => handleTramiteClick(tramite.id)}
                  >
                    {tramite.descripcion}
                  </BotonAccion>
                ))}
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <BotonVolver onClick={handleBackClick} sx={{ maxWidth: '400px' }} />
            </Box>
          </TarjetaPrincipal>
        </Grid>
      </Grid>
    </ContenedorPrincipal>
  );
};

export default Tramites;