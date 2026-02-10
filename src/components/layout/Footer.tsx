import { useState } from 'react';
import { Container, Box, styled, Typography } from '@mui/material';
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

const Footer = () => {
  const [currentYear] = useState<number>(new Date().getFullYear());

  const linkItemSx = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0.75,
    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' },
    color: 'inherit',
  };

  return (
    <StyledFooter>
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Box component="span" sx={linkItemSx}>
              <MdWeb /> www.corpico.com.ar
            </Box>
            <Box component="span" sx={linkItemSx}>
              <MdSmartphone /> corpicoapp.web.app
            </Box>
          </Box>
          <Box sx={{ height: '1px', width: { xs: '70%', sm: '55%', md: '40%' }, bgcolor: 'rgba(255,255,255,0.35)' }} />
          <Typography variant="body2" color="inherit" sx={{ fontSize: { xs: '0.68rem', sm: '0.72rem', md: '0.8rem' }, textAlign: 'center' }}>
            Corpico &copy; <span>{currentYear}</span>. Turnero creado por <strong>Sección Sistemas</strong>.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;