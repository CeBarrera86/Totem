import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import BotonAccion from '../components/botones/BotonAccion';
import BotonVolver from '../components/botones/BotonVolver';
import Procesando from '../components/dialogos/Procesando';
import TicketSuccess from '../components/dialogos/TicketSuccess';
import ContenedorPrincipal from '../components/layout/ContenedorPrincipal';
import TarjetaPrincipal from '../components/tarjeta/TarjetaPrincipal';
import useDatosCliente from '../components/utilidades/useDatosCliente';
import useFetchData from '../components/utilidades/useFetchData';
import axios from 'axios';

const Tramites = () => {
  const navigate = useNavigate();
  const cliente = useDatosCliente();
  const theme = useTheme();
  const { data: sectores, loading, error } = useFetchData('http://localhost:5144/api/Sector');
  const [isLoading, setIsLoading] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const handleTramiteClick = async (tramite, event) => {
    if (event && event.currentTarget) {
      event.currentTarget.blur();
    }
    setIsLoading(true);

    if (!cliente || !cliente.id) {
      alert("Error: No se pudo obtener la información del cliente para sacar turno.");
      console.error("Cliente o cliente.id no disponible para la llamada a Ticket API.");
      setTimeout(() => setIsLoading(false), 500);
      return;
    }
    // Identificar el sector padre (USUARIOS o RECLAMOS)
    const sectorPadreId = tramite.padreId;

    if (!sectorPadreId) {
      alert("Error: No se pudo determinar el sector de origen para este trámite.");
      console.error("Trámite sin padreId definido:", tramite);
      setTimeout(() => setIsLoading(false), 500);
      return;
    }

    try {
      const payload = { clienteId: cliente.id, sectorIdOrigen: sectorPadreId };
      const response = await axios.post('http://localhost:5144/api/Ticket', payload);

      setTimeout(() => {
        setIsLoading(false);
        setTicketInfo({ letra: response.data.letra, numero: response.data.numero });
        setOpenTicketDialog(true);
      }, 100);

    } catch (err) {
      console.error("Error al solicitar turno para trámite:", err);
      setTimeout(() => {
        setIsLoading(false);
        if (err.response) {
          alert(`Error al solicitar turno: ${err.response.data.message || 'Error desconocido del servidor.'}`);
        } else if (err.request) {
          alert("Error de conexión: No se pudo comunicar con el servidor de tickets.");
        } else {
          alert("Ocurrió un error inesperado al solicitar el turno.");
        }
      }, 100);
    }
  };
  const handleBackClick = () => {
    navigate('/secciones');
  };
  const handleCloseTicketDialog = () => {
    setOpenTicketDialog(false);
    sessionStorage.removeItem('datosCliente');
    navigate('/');
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
        <Grid size={{ xs: 12 }} sx={{ minWidth: '1300px', width: '100%' }}>
          <TarjetaPrincipal titulo={tituloCard} subtitulo={subTituloCard} >
            <Grid container spacing={2} justifyContent="center" alignItems="stretch" sx={{ mb: 2 }}>
              {/* Columna Izquierda: USUARIOS */}
              <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {usuarios.length > 0}
                {usuarios.map((tramite) => (
                  <BotonAccion key={tramite.id}
                    sx={{ width: '600px', height: '80px', fontSize: '27px', mb: 2, }}
                    onClick={() => handleTramiteClick(tramite)} >
                    {tramite.descripcion}
                  </BotonAccion>
                ))}
              </Grid>
              {/* Columna Derecha: RECLAMOS */}
              <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {reclamos.length > 0}
                {reclamos.map((tramite) => (
                  <BotonAccion key={tramite.id}
                    sx={{ width: '600px', height: '80px', fontSize: '27px', mb: 2, }}
                    onClick={() => handleTramiteClick(tramite)} >
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
      <Procesando open={isLoading} />
      <TicketSuccess open={openTicketDialog} ticketData={ticketInfo} onClose={handleCloseTicketDialog} />
    </ContenedorPrincipal>
  );
};

export default Tramites;