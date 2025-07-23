import React, { useState, useEffect } from 'react';
import { AppBar, Container, Grid, styled, Toolbar, Typography, useTheme } from '@mui/material';

// Estilo para el logo
const LogoImage = styled('img')({
    width: '50%',
    height: 'auto',
});

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
    backgroundColor: theme.palette.mode === 'dark' ? '#212529' : '#343a40',
    color: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    height: '75px',
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderBottom: '5px solid',
    borderImageSlice: 1,
    borderImageSource: `linear-gradient(to right, ${borderColorsForGradient.join(', ')})`,
    borderRadius: 0,
  };
});

const Navbar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('es-AR', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <StyledAppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Grid container alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
                        {/* Columna 1: Logo */}
                        <Grid sx={{ width: { xs: '40%', sm: '33%' }, display: 'flex', justifyContent: 'flex-start' }}>
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
                                <LogoImage src="src/assets/img/Corpico_logo.svg" alt="Corpico Logo" title="Corpico_logo" />
                            </Typography>
                        </Grid>

                        {/* Columna 2: Título central */}
                        <Grid sx={{ width: { xs: '60%', sm: '33%' }, display: 'flex', justifyContent: 'center' }}>
                            <Typography
                                variant="h5"
                                noWrap
                                component="div"
                                sx={{
                                    fontWeight: 700,
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                }}
                            >
                                <strong>Gestión de Turnos</strong>
                            </Typography>
                        </Grid>

                        {/* Columna 3: Hora actual */}
                        <Grid sx={{ width: { sm: '33%' }, display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end' }}>
                            <Typography variant="h6" noWrap component="div" sx={{ color: 'inherit' }}>
                                <strong>{formatDate(currentTime)} - {formatTime(currentTime)}</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </StyledAppBar >
    );
};

export default Navbar;