import React, { useState } from 'react';
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
    backgroundColor: theme.palette.mode === 'dark' ? '#212529' : '#343a40',
    color: 'white',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '75px',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: theme.zIndex.appBar,
    boxSizing: 'border-box',
    borderTop: '5px solid',
    borderImageSlice: 1,
    borderImageSource: `linear-gradient(to right, ${borderColorsForGradient.join(', ')})`,
  };
});

// Estilo para el marquee
const MarqueeContainer = styled(Box)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  display: 'inline-block',
  '& span': {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: '3em',
  },
  animation: 'marquee 15s linear infinite',
  '@keyframes marquee': {
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(-100%)' },
  },
});

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <StyledFooter>
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ width: '100%' }} >
          {/* Columna 1: Copyright */}
          <Grid sx={{
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
            width: { sm: '50%' },
          }}>
            <Typography variant="body2" color="inherit">
              Corpico &copy; <span>{currentYear}</span>. Turnero creado por <strong>Sección Sistemas</strong>.
            </Typography>
          </Grid>
          {/* Columna 2: Marquee */}
          <Grid sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'flex-end' },
            alignItems: 'center',
            width: { xs: '100%', sm: '50%' },
            overflow: 'hidden',
          }}>
            <MarqueeContainer>
              <span className="d-flex align-items-center">
                <MdWeb style={{ marginRight: '0.5em' }} />
                Sitio WEB ( www.corpico.com.ar )
              </span>
              <span className="d-flex align-items-center">
                <MdSmartphone style={{ marginRight: '0.5em' }} />
                Corpico DIGITAL ( corpicoapp.web.app )
              </span>
            </MarqueeContainer>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  );
};

export default Footer;