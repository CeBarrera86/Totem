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
import useFetchData from '../components/utilidades/useFetchData';
import axios from 'axios';

const Index = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { data: sectors, loading, error } = useFetchData('http://localhost:5144/api/Sector');
  const [isLoading, setIsLoading] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);

  const handleSectionClick = async (sectorId, event) => {
    if (event?.currentTarget) event.currentTarget.blur();
    setIsLoading(true);

    try {
      const payload = { clienteId: 1, sectorIdOrigen: sectorId };
      const response = await axios.post('http://localhost:5144/api/Ticket', payload);

      setIsLoading(false);
      setTicketInfo({ letra: response.data.letra, numero: response.data.numero });
      setOpenTicketDialog(true);
    } catch (err) {
      console.error("Error al solicitar turno:", err);
      setTimeout(() => {
        setIsLoading(false);
        if (err.response) {
          alert(`Error: ${err.response.data.message || 'Error desconocido del servidor.'}`);
        } else if (err.request) {
          alert("Error de conexión con el servidor.");
        } else {
          alert("Ocurrió un error inesperado.");
        }
      }, 100);
    }
  };

  const handleCloseTicketDialog = () => {
    setOpenTicketDialog(false);
    navigate('/');
  };

  const filteredSectors = sectors.filter(sector =>
    sector.padreId === null && [1, 3, 4].includes(sector.id)
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

  const tituloCard = (
    <Box>
      <Typography fontSize="2rem" fontWeight="bold" align="center" color="inherit" sx={{ lineHeight: 1.2 }}>
        Bienvenido/a
      </Typography>
    </Box>
  );

  return (
    <ContenedorPrincipal>
      <Grid container spacing={4} alignItems="stretch" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TarjetaPrincipal titulo={tituloCard}>
            <Typography align="center" variant="h6" sx={{ color: theme.palette.text.third }}>
              SACAR TURNO PARA:
            </Typography>

            {/* Primera fila: solo sector 1 */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {filteredSectors.filter(s => s.id === 1).map(sector => (
                <BotonAccion
                  key={sector.id}
                  sx={{ height: '160px', width: '100%', maxWidth: '400px', fontSize: '65px' }}
                  onClick={(event) => handleSectionClick(sector.id, event)}
                >
                  {sector.nombre}
                </BotonAccion>
              ))}
            </Box>

            {/* Segunda fila: sectores 3 y 4 */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {filteredSectors.filter(s => s.id === 3 || s.id === 4).map(sector => (
                <BotonAccion
                  key={sector.id}
                  sx={{
                    height: '160px',
                    flexBasis: { xs: '100%', sm: 'calc(50% - 16px)' },
                    maxWidth: { xs: '100%', sm: 'calc(50% - 16px)' },
                    fontSize: '40px',
                  }}
                  onClick={(event) => handleSectionClick(sector.id, event)}
                >
                  {sector.nombre}
                </BotonAccion>
              ))}
            </Box>
          </TarjetaPrincipal>
        </Grid>
      </Grid>
      <Procesando open={isLoading} />
      <TicketSuccess open={openTicketDialog} ticketData={ticketInfo} onClose={handleCloseTicketDialog} />
    </ContenedorPrincipal>
  );
};

export default Index