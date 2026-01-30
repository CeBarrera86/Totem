import type { MouseEvent } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import TarjetaPrincipal from '@/components/tarjeta/TarjetaPrincipal';
import BotonAccion from '@/components/botones/BotonAccion';
import { useSectoresFiltrados } from '@/hooks/useSectoresFiltrados';
import type { Sector } from '@/models/sector';

interface InnerIndexProps {
  sectores: Sector[];
  onClick: (sectorId: number, event?: MouseEvent<HTMLButtonElement>) => void;
}

const InnerIndex = ({ sectores, onClick }: InnerIndexProps) => {
  const theme = useTheme();
  const filteredSectors = useSectoresFiltrados(sectores, [1, 3, 4]);

  const tituloCard = (
    <Box>
      <Typography fontSize="2rem" fontWeight="bold" align="center" color="inherit">
        Bienvenido/a
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: '800px', width: '100%', mx: 'auto' }}>
      <TarjetaPrincipal titulo={tituloCard}>
        <Typography align="center" variant="h6" sx={{ color: theme.palette.text.third }}>
          SACAR TURNO PARA:
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {filteredSectors
            .filter((sector) => sector.id === 1)
            .map((sector) => (
              <BotonAccion
                key={sector.id}
                sx={{ height: '160px', width: '100%', maxWidth: '400px', fontSize: '80px' }}
                onClick={(event) => onClick(sector.id, event)}
              >
                {sector.nombre}
              </BotonAccion>
            ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
          {filteredSectors
            .filter((sector) => sector.id === 3 || sector.id === 4)
            .map((sector) => (
              <BotonAccion
                key={sector.id}
                sx={{
                  height: '160px',
                  flexBasis: { xs: '100%', sm: 'calc(50% - 16px)' },
                  maxWidth: { xs: '100%', sm: 'calc(50% - 16px)' },
                  fontSize: '60px',
                }}
                onClick={(event) => onClick(sector.id, event)}
              >
                {sector.nombre}
              </BotonAccion>
            ))}
        </Box>
      </TarjetaPrincipal>
    </Box>
  );
};

export default InnerIndex;