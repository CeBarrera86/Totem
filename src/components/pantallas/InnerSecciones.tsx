import type { MouseEvent } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TarjetaPrincipal from '@/components/tarjeta/TarjetaPrincipal';
import BotonAccion from '@/components/botones/BotonAccion';
import BotonVolver from '@/components/botones/BotonVolver';
import type { Sector } from '@/models/sector';
import type { Cliente } from '@/models/cliente';

interface InnerSeccionesProps {
  sectores: Sector[];
  cliente: Cliente | null;
  onClick: (sectorId: number, event?: MouseEvent<HTMLButtonElement>) => void;
  onBack: () => void;
}

const InnerSecciones = ({ sectores, cliente, onClick, onBack }: InnerSeccionesProps) => {
  const theme = useTheme();
  const filteredSectors = sectores.filter((s) => [1, 2].includes(s.id));
  const clienteNombreCompleto = cliente?.titular?.trim().toUpperCase() || 'CLIENTE DESCONOCIDO';

  const tituloCard = (
    <Box>
      <Typography
        fontWeight="bold"
        align="center"
        color="inherit"
        sx={{ fontSize: { xs: '1.6rem', sm: '1.9rem', md: '2rem' } }}
      >
        Bienvenido/a
      </Typography>
      <Typography align="center" color="inherit" sx={{ mt: 1, fontSize: { xs: '1.4rem', sm: '1.7rem', md: '2rem' } }}>
        {clienteNombreCompleto}
      </Typography>
    </Box>
  );

  return (
    <Grid container spacing={3} alignItems="stretch" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
      <Grid size={{ xs: 12, md: 8 }}>
        <TarjetaPrincipal titulo={tituloCard}>
          <Typography align="center" variant="h6" sx={{ color: theme.palette.text.third }}>
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
              gap: { xs: 2, sm: 2.5 },
            }}
          >
            {filteredSectors.map((sector) => (
              <BotonAccion
                key={sector.id}
                sx={{
                  height: { xs: '90px', sm: '110px', md: '130px' },
                  flexGrow: 1,
                  flexBasis: { xs: '100%', sm: 'calc(50% - 16px)' },
                  maxWidth: { xs: '100%', sm: 'calc(50% - 16px)' },
                  fontSize:
                    sector.nombre.toUpperCase() === 'CAJAS'
                      ? { xs: '30px', sm: '42px', md: '52px' }
                      : { xs: '22px', sm: '30px', md: '36px' },
                }}
                onClick={(e) => onClick(sector.id, e)}
              >
                {sector.nombre}
              </BotonAccion>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 1, sm: 2 } }}>
            <BotonVolver onClick={onBack} sx={{ width: '100%', maxWidth: { xs: '100%', sm: '320px', md: '360px' } }} />
          </Box>
        </TarjetaPrincipal>
      </Grid>
    </Grid>
  );
};

export default InnerSecciones;