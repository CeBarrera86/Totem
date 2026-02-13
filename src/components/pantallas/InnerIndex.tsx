import type { MouseEvent } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import { useSectoresFiltrados } from '@/hooks/useSectoresFiltrados';
import type { Sector } from '@/models/sector';

interface InnerIndexProps {
  sectores: Sector[];
  onClick: (sectorId: number, event?: MouseEvent<HTMLButtonElement>) => void;
}

const InnerIndex = ({ sectores, onClick }: InnerIndexProps) => {
  const theme = useTheme();
  // IDs esperados ahora: 1, 2, 3
  const filteredSectors = useSectoresFiltrados(sectores, [1, 2, 3]);
  const sortedSectors = [1, 2, 3]
    .map((id) => filteredSectors.find((sector) => sector.id === id))
    .filter((sector): sector is Sector => Boolean(sector));

  const sectorStyle = (sectorId: number) => {
    switch (sectorId) {
      case 1: // CAJAS
        return { color: theme.palette.corpico.verde, icon: PaymentsRoundedIcon };
      case 2: // USUARIOS
        return { color: theme.palette.corpico.violeta, icon: PeopleAltRoundedIcon };
      case 3: // RECLAMOS
        return { color: theme.palette.corpico.azul, icon: ReportProblemRoundedIcon };
      default:
        return { color: theme.palette.grey[500], icon: PaymentsRoundedIcon };
    }
  };

  return (
    <Box sx={{ maxWidth: { xs: '100%', sm: '520px', md: '560px' }, width: '100%', mx: 'auto', px: { xs: 1.5, sm: 0 } }}>
      <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 3.5 } }}>
        <Typography
          fontWeight={700}
          color={theme.palette.text.third}
          sx={{ fontSize: { xs: '1.6rem', sm: '1.9rem', md: '2.1rem' } }}
        >
          ¡Bienvenido/a!
        </Typography>
        <Typography
          sx={{
            color: theme.palette.grey[700],
            fontSize: { xs: '0.98rem', sm: '1.08rem' },
            fontWeight: 500,
            mt: 0.5,
          }}
        >
          ¿A qué área deseas dirigirte?
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4.5, sm: 5 } }}>
        {sortedSectors.map((sector) => {
          const { color, icon: Icon } = sectorStyle(sector.id);

          return (
            <ButtonBase
              key={sector.id}
              onClick={(event) => onClick(sector.id, event)}
              sx={{
                textAlign: 'left',
                borderRadius: '18px',
                overflow: 'hidden',
                bgcolor: '#ffffff',
                width: '100%',
                height: { xs: 132, sm: 152 },
                boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
                border: '1px solid rgba(15, 23, 42, 0.05)',
                transition: 'transform 180ms ease, box-shadow 180ms ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 16px 32px rgba(15, 23, 42, 0.16)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: { xs: 2, sm: 2.5 },
                  py: 0,
                  height: '100%',
                  width: '100%',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    width: '5px',
                    height: '72px',
                    borderRadius: '4px',
                    bgcolor: color,
                  }}
                />
                <Box
                  sx={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '14px',
                    bgcolor: `${color}1A`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color,
                    flexShrink: 0,
                  }}
                >
                  <Icon sx={{ fontSize: 28 }} />
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      fontSize: { xs: '2.1rem', sm: '2.25rem' },
                      color: theme.palette.grey[900],
                    }}
                  >
                    {sector.nombre?.toUpperCase()}
                  </Typography>
                  {sector.descripcion && (
                    <Typography
                      sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: theme.palette.grey[600],
                        fontWeight: 500,
                      }}
                    >
                      {sector.descripcion}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    width: { xs: 32, sm: 36 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.grey[400],
                    flexShrink: 0,
                  }}
                >
                  <ChevronRightRoundedIcon />
                </Box>
              </Box>
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
};

export default InnerIndex;