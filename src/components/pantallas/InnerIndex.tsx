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
  const sortedSectors = [1, 3, 4]
    .map((id) => filteredSectors.find((sector) => sector.id === id))
    .filter((sector): sector is Sector => Boolean(sector));

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
    </Box>
  );

  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: '620px', md: '700px' }, width: '100%', mx: 'auto' }}>
      <TarjetaPrincipal
        titulo={tituloCard}
        sx={{ minHeight: { xs: 420, sm: 480, md: 520 }, justifyContent: 'space-between' }}
      >
        <Typography align="center" variant="h6" sx={{ color: theme.palette.text.third }}>
          SACAR TURNO PARA:
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2.5, sm: 3.5 }, alignItems: 'center', mt: 1 }}>
          {sortedSectors.map((sector) => (
            <BotonAccion
              key={sector.id}
              sx={{
                height: { xs: '110px', sm: '130px', md: '150px' },
                width: '100%',
                maxWidth: { xs: '100%', sm: '520px', md: '560px' },
                fontSize: { xs: '34px', sm: '46px', md: '58px' },
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