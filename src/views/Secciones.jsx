import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    CssBaseline,
    createTheme,
    ThemeProvider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const theme = createTheme({
    typography: { fontFamily: 'Poppins, sans-serif' },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
        }
      `
        }
    }
});

// Estilo para los botones de sección
const SectionButton = styled(Button)(({ theme }) => ({
    minWidth: '300px', // Ancho mínimo para los botones
    height: '150px', // Altura para los botones
    fontSize: '2.0rem', // Tamaño de fuente grande
    fontWeight: 'bold',
    borderRadius: theme.spacing(2), // Bordes redondeados
    margin: theme.spacing(2), // Margen entre botones
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)', // Sombra más pronunciada
    transition: 'transform 0.2s, box-shadow 0.2s', // Transiciones suaves
    '&:hover': {
        transform: 'translateY(-5px)', // Efecto de elevación al pasar el mouse
        boxShadow: '0 12px 20px rgba(0,0,0,0.3)',
    },
    // Colores específicos para cada botón
    '&.atencion-publico': {
        background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)', // Verde
        color: '#fff',
    },
    '&.cajas': {
        background: 'linear-gradient(45deg, #2196F3 30%, #90CAF9 90%)', // Azul
        color: '#fff',
    },
}));

const Secciones = () => {
    const navigate = useNavigate(); // Hook para la navegación

    const handleSectionClick = (section) => {
        console.log(`Botón de ${section} clickeado`);
        // Aquí podrías guardar la sección seleccionada en localStorage
        // o pasarla como estado a la siguiente vista
        // navigate('/siguiente-vista-dependiendo-de-seccion', { state: { section } });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    bgcolor: '#fafafa',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column', // Permite el espacio entre el título y los botones
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                }}
            >
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        fontWeight="bold"
                        mb={6} // Margen inferior para separar del título
                        color="#333"
                    >
                        ELIJA LA SECCIÓN
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' }, // Columnas en móviles, fila en escritorio
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap', // Permite que los botones se envuelvan si la pantalla es muy pequeña
                        }}
                    >
                        <SectionButton
                            className="atencion-publico"
                            onClick={() => handleSectionClick('Atención al Público')}
                        >
                            ATENCIÓN AL PÚBLICO
                        </SectionButton>
                        <SectionButton
                            className="cajas"
                            onClick={() => handleSectionClick('Cajas')}
                        >
                            CAJAS
                        </SectionButton>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Secciones;