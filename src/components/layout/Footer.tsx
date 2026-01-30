import { useState } from 'react';
import { Container, Grid, Box, styled, Typography } from '@mui/material';
import { MdWeb, MdSmartphone } from 'react-icons/md';

const StyledFooter = styled(Box)(({ theme }) => {
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
    bottom: 0,
    left: 0,
    right: 0,
    height: '90px',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: theme.zIndex.appBar,
    boxSizing: 'border-box',
    borderTop: '5px solid',
    borderImageSlice: 1,
    borderImageSource: `linear-gradient(to right, ${borderColorsForGradient.join(', ')})`,
    [theme.breakpoints.down('md')]: {
      height: '84px',
      padding: theme.spacing(1.5),
    },
    [theme.breakpoints.down('sm')]: {
      height: '78px',
    },
  };
});

const MarqueeContent = styled(Box)({
  display: 'flex',
  whiteSpace: 'nowrap',
  animation: 'marquee 15s linear infinite',
  '@keyframes marquee': {
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(-100%)' },
  },
});

const Footer = () => {
  const [currentYear] = useState<number>(new Date().getFullYear());

  const marqueeItemSx = {
    display: 'inline-flex',
    alignItems: 'center',
    mr: 3,
    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' },
  };

  const iconSx = { mr: 1 };

  const marqueeItems = (
    <>
      <Box component="span" sx={marqueeItemSx}>
        <Box component="span" sx={iconSx}>
          <MdWeb />
        </Box>
        Sitio WEB ( www.corpico.com.ar )
      </Box>
      <Box component="span" sx={marqueeItemSx}>
        <Box component="span" sx={iconSx}>
          <MdSmartphone />
        </Box>
        Corpico DIGITAL ( corpicoapp.web.app )
      </Box>
    </>
  );

  return (
    <StyledFooter>
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%', flexDirection: { xs: 'column', sm: 'column', md: 'row' }, rowGap: { xs: 0.5, sm: 0.5, md: 0 } }}
        >
          {/* Columna 1: Copyright */}
          <Grid
            sx={{
              display: { xs: 'flex', sm: 'flex' },
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: 'center',
              width: { xs: '100%', sm: '100%', md: '50%' },
            }}
          >
            <Typography variant="body2" color="inherit" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' }, textAlign: 'center' }}>
              Corpico &copy; <span>{currentYear}</span>. Turnero creado por <strong>Sección Sistemas</strong>.
            </Typography>
          </Grid>
          {/* Columna 2: Marquee - Este Grid actúa como la "ventana" de visualización */}
          <Grid
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'center', md: 'flex-end' },
              alignItems: 'center',
              width: { xs: '100%', sm: '100%', md: '50%' },
              overflow: 'hidden',
            }}
          >
            <MarqueeContent>{marqueeItems}</MarqueeContent>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  );
};

export default Footer;