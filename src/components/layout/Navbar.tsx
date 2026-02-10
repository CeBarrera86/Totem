import { useEffect, useState } from 'react';
import { AppBar, Box, Container, Grid, styled, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';

import corpicoLogo from '@/assets/img/Corpico_logo.svg';

// Estilo para el logo
const LogoImage = styled('img')(({ theme }) => ({
  width: '90px',
  height: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '110px',
  },
  [theme.breakpoints.up('md')]: {
    width: '140px',
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => {
  const borderColorsForGradient = [
    theme.palette.corpico.azul,
    theme.palette.corpico.violeta,
    theme.palette.corpico.rojo,
    theme.palette.corpico.naranja,
    theme.palette.corpico.amarillo,
    theme.palette.corpico.verde,
    theme.palette.corpico.celeste,
  ];

  return {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.layout : theme.palette.background.paper,
    color: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    height: '90px',
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderBottom: '5px solid',
    borderImageSlice: 1,
    borderImageSource: `linear-gradient(to right, ${borderColorsForGradient.join(', ')})`,
    borderRadius: 0,
    [theme.breakpoints.down('md')]: {
      height: '84px',
    },
    [theme.breakpoints.down('sm')]: {
      height: '78px',
    },
  };
});

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-AR',
      isCompact
        ? { day: '2-digit', month: 'short' }
        : { weekday: 'short', day: '2-digit', month: 'short', year: '2-digit' }
    );
  };

  return (
    <StyledAppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 78, sm: 84, md: 90 } }}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: '100%', flexWrap: 'wrap', rowGap: { xs: 0.5, sm: 0 } }}
          >
            {/* Columna 1: Logo */}
            <Grid sx={{ width: { xs: '30%', sm: '25%', md: '33%' }, display: 'flex', justifyContent: 'flex-start' }}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <LogoImage src={corpicoLogo} alt="Corpico Logo" title="Corpico_logo" />
              </Typography>
            </Grid>

            {/* Columna 2: Hora actual */}
            <Grid
              sx={{
                width: { xs: '70%', sm: '75%', md: '67%' },
                display: 'flex',
                justifyContent: { xs: 'flex-end', sm: 'flex-end' },
              }}
            >
              <Box
                sx={{
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 0.6, sm: 0.75 },
                  borderRadius: '999px',
                  bgcolor: theme.palette.grey[100],
                  color: theme.palette.grey[900],
                  border: `1px solid ${theme.palette.grey[200]}`,
                }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ color: 'inherit', fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1.05rem' } }}
                >
                  <strong>
                    {formatTime(currentTime)}
                  </strong>
                  <Box component="span" sx={{ mx: 0.75, color: theme.palette.grey[500] }}>
                    |
                  </Box>
                  <Box component="span" sx={{ color: theme.palette.grey[600] }}>
                    {formatDate(currentTime)}
                  </Box>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;