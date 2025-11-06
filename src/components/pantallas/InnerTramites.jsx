import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import TarjetaPrincipal from '../../components/tarjeta/TarjetaPrincipal';
import BotonAccion from '../../components/botones/BotonAccion';
import BotonVolver from '../../components/botones/BotonVolver';

const InnerTramites = ({ sectores, cliente, onClick, onBack }) => {
  const usuarios = sectores.filter(t => t.padreId === 3);
  const reclamos = sectores.filter(t => t.padreId === 4);
  const titular = cliente?.titular?.trim().toUpperCase() || 'CLIENTE DESCONOCIDO';

  const tituloCard = (
    <Box>
      <Typography fontSize="2rem" align="center" color="inherit" sx={{ mt: 1 }}>
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
    <Grid container justifyContent="center">
      <Grid size={{ xs: 12 }} sx={{ minWidth: '1300px', width: '100%' }}>
        <TarjetaPrincipal titulo={tituloCard} subtitulo={subTituloCard}>
          <Grid container spacing={2} justifyContent="center" alignItems="stretch" sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {usuarios.map((tramite) => (
                <BotonAccion
                  key={tramite.id}
                  sx={{ width: '600px', height: '80px', fontSize: '27px', mb: 2 }}
                  onClick={(e) => onClick(tramite, e)}
                >
                  {tramite.descripcion}
                </BotonAccion>
              ))}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {reclamos.map((tramite) => (
                <BotonAccion
                  key={tramite.id}
                  sx={{ width: '600px', height: '80px', fontSize: '27px', mb: 2 }}
                  onClick={(e) => onClick(tramite, e)}
                >
                  {tramite.descripcion}
                </BotonAccion>
              ))}
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <BotonVolver onClick={onBack} sx={{ maxWidth: '400px' }} />
          </Box>
        </TarjetaPrincipal>
      </Grid>
    </Grid>
  );
};

export default InnerTramites;