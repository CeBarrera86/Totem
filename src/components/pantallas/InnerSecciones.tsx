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
      <Typography fontSize="2rem" fontWeight="bold" align="center" color="inherit">
        Bienvenido/a
      </Typography>
      <Typography fontSize="2rem" align="center" color="inherit" sx={{ mt: 1 }}>
        {clienteNombreCompleto}
      </Typography>
    </Box>
  );

  return (
    <Grid container spacing={4} alignItems="stretch" justifyContent="center" sx={{ width: '100%', height: '100%' }}>
      <Grid item xs={12} md={8}>
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
            }}
          >
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
                onClick={(e) => onClick(sector.id, e)}
              >
                {sector.nombre}
              </BotonAccion>
            ))}
          </Box>
          <BotonVolver onClick={onBack} />
        </TarjetaPrincipal>
      </Grid>
    </Grid>
  );
};

export default InnerSecciones;