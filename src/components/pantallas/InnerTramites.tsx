import type { MouseEvent } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import TarjetaPrincipal from '@/components/tarjeta/TarjetaPrincipal';
import BotonAccion from '@/components/botones/BotonAccion';
import BotonVolver from '@/components/botones/BotonVolver';
import type { Tramite } from '@/models/tramite';
import type { Cliente } from '@/models/cliente';

interface InnerTramitesProps {
  tramites: Tramite[];
  cliente: Cliente | null;
  onClick: (tramite: Tramite, event?: MouseEvent<HTMLButtonElement>) => void;
  onBack: () => void;
}

const InnerTramites = ({ tramites, cliente, onClick, onBack }: InnerTramitesProps) => {
  const usuarios = tramites.filter((t) => t.padreId === 3);
  const reclamos = tramites.filter((t) => t.padreId === 4);
  const titular = cliente?.titular?.trim().toUpperCase() || 'CLIENTE DESCONOCIDO';

  const tituloCard = (
    <Box>
      <Typography align="center" color="inherit" sx={{ mt: 1, fontSize: { xs: '1.4rem', sm: '1.7rem', md: '2rem' } }}>
        {titular}
      </Typography>
    </Box>
  );

  const subTituloCard = (
    <Typography
      align="center"
      variant="h6"
      color="inherit"
      sx={{ opacity: 0.8, fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
    >
      Seleccione su trámite
    </Typography>
  );

  const buttonSx = {
    width: { xs: '100%', sm: '100%', md: '520px' },
    height: { xs: '64px', sm: '72px', md: '80px' },
    fontSize: { xs: '20px', sm: '24px', md: '27px' },
  };

  return (
    <Grid container justifyContent="center">
      <Grid size={{ xs: 12 }} sx={{ width: '100%', maxWidth: { xs: '100%', md: '900px' } }}>
        <TarjetaPrincipal titulo={tituloCard} subtitulo={subTituloCard}>
          <Grid container spacing={2} justifyContent="center" alignItems="stretch" sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Usuarios
              </Typography>
              {usuarios.map((tramite) => (
                <BotonAccion
                  key={tramite.id}
                  sx={{ ...buttonSx, mb: 2 }}
                  onClick={(e) => onClick(tramite, e)}
                  buttonColor="success"
                >
                  {tramite.descripcion}
                </BotonAccion>
              ))}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Reclamos
              </Typography>
              {reclamos.map((tramite) => (
                <BotonAccion
                  key={tramite.id}
                  sx={{ ...buttonSx, mb: 2 }}
                  onClick={(e) => onClick(tramite, e)}
                  buttonColor="info"
                >
                  {tramite.descripcion}
                </BotonAccion>
              ))}
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <BotonVolver onClick={onBack} sx={{ width: '100%', maxWidth: { xs: '100%', sm: '320px', md: '360px' } }} />
          </Box>
        </TarjetaPrincipal>
      </Grid>
    </Grid>
  );
};

export default InnerTramites;