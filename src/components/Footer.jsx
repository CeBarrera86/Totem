import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { MdWeb, MdSmartphone } from 'react-icons/md';

// Estilo para el Footer
const StyledFooter = styled(Box)(({ theme }) => ({
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
}));

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
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
  }, []);

  return (
    <StyledFooter>
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Grid container alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          {/* Columna 1: Copyright */}
          <Grid sx={{
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
            width: { sm: '50%' },
          }}>
            <Typography variant="body2" color="inherit">
              Corpico &copy; <span id="year">{currentYear}</span>. Turnero creado por <strong>Sección Sistemas</strong>.
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