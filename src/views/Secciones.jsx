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

const Secciones = () => {
  const navigate = useNavigate();
  const cliente = useDatosCliente();
  const theme = useTheme();
  const { data: sectors, loading, error } = useFetchData('http://localhost:5144/api/Sector');
  const [isLoading, setIsLoading] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);

  const handleSectionClick = async (sectorId, event) => {
    if (event && event.currentTarget) {
      event.currentTarget.blur();
    }
    setIsLoading(true);
    if (sectorId === 2) {
      setTimeout(() => {
        setIsLoading(false);
        navigate('/tramites');
      }, 500);
    } else if (sectorId === 1) {
      if (!cliente || !cliente.id) {
        alert("Error: No se pudo obtener la información del cliente para sacar turno.");
        console.error("Cliente o cliente.id no disponible para la llamada a Ticket API.");
        setIsLoading(false);
        return;
      }

      try {
        const payload = { clienteId: cliente.id, sectorIdOrigen: sectorId };
        const response = await axios.post('http://localhost:5144/api/Ticket', payload);

        setIsLoading(false);
        setTicketInfo({ letra: response.data.letra, numero: response.data.numero });
        setOpenTicketDialog(true);
      } catch (err) {
        console.error("Error al solicitar turno para CAJAS:", err);
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
    }
  };

  const handleBackClick = () => {
    sessionStorage.removeItem('datosCliente');
    navigate('/');
  };

  const handleCloseTicketDialog = () => {
    setOpenTicketDialog(false);
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
      <Typography fontSize="2rem" fontWeight="bold" align="center" color="inherit" sx={{ lineHeight: 1.2 }} >
        Bienvenido/a
      </Typography>
      <Typography fontSize="2rem" align="center" color="inherit" sx={{ mt: 1, lineHeight: 1.2 }} >
        {clienteNombreCompleto}
      </Typography>
    </Box>
  );

  return (
    <ContenedorPrincipal>
      <Grid container spacing={4} alignItems="stretch" justifyContent="center" sx={{ width: '100%', height: '100%' }} >
        <Grid size={{ xs: 12, md: 8 }}>
          <TarjetaPrincipal titulo={tituloCard}>
            <Typography align="center" variant="h6" sx={{ color: theme.palette.text.third }} >
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
              }} >
              {filteredSectors.map((sector) => (
                <BotonAccion
                  key={sector.id}
                  sx={{
                    height: '160px',
                    flexGrow: 1,
                    flexBasis: { xs: '100%', sm: 'calc(50% - 16px)' },
                    maxWidth: { xs: '100%', sm: 'calc(50% - 16px)' },
                    fontSize: sector.nombre.toUpperCase() === 'CAJAS' ? '65px' : '40px',
                  }}
                  onClick={(event) => handleSectionClick(sector.id, event)} > {/* Pasar el evento */}
                  {sector.nombre}
                </BotonAccion>
              ))}
            </Box>
            <BotonVolver onClick={handleBackClick} />
          </TarjetaPrincipal>
        </Grid>
      </Grid>
      <Procesando open={isLoading} />
      <TicketSuccess open={openTicketDialog} ticketData={ticketInfo} onClose={handleCloseTicketDialog} />
    </ContenedorPrincipal>
  );
};

export default Secciones;