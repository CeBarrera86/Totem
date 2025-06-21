import React from 'react';
import axios from 'axios';
import {
    Box,
    Container,
    Card,
    CardHeader,
    CardContent,
    Typography,
    TextField,
    Button,
    FormHelperText
} from '@mui/material';
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// const theme = createTheme({
//     typography: { fontFamily: 'Poppins, sans-serif' },
//     components: {
//         MuiCssBaseline: {
//             styleOverrides: `
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
//         html, body, #root {
//           height: 100%;
//           margin: 0;
//           padding: 0;
//         }
//       `
//         }
//     }
// });

const dniSchema = z.object({
    dni: z.string()
        .min(7, "DNI mínimo 7 dígitos.")
        .max(10, "DNI máximo 10 dígitos.")
        .regex(/^\d+$/, "Solo números.")
});

const KeypadButton = styled(Button)(({ theme }) => ({
    background: '#444',
    color: '#fff',
    fontSize: '40px',
    fontWeight: 500,
    borderRadius: 40,
    minWidth: 70,
    height: 85,
    margin: theme.spacing(0.5),
    '&:hover': { background: '#555' },
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
}));

const Home = () => {
    const DNI_MAX_LENGTH = 10;
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(dniSchema),
        defaultValues: { dni: '' },
        mode: 'onChange'
    });

    const currentDniValue = watch('dni');

    const onNumberClick = (num) => {
        const currentValue = getValues('dni') || '';
        if (currentValue.length < DNI_MAX_LENGTH) {
            setValue('dni', currentValue + num, { shouldValidate: true, shouldDirty: true });
        }
    };

    const onBackspace = () => {
        const currentValue = getValues('dni') || '';
        setValue('dni', currentValue.slice(0, -1), { shouldValidate: true, shouldDirty: true });
    };

    const onSubmit = async (data) => {
        console.log("DNI Validado para la consulta:", data.dni);

        try {
            // 1. REALIZAR LA CONSULTA A LA API CON AXIOS
            const response = await axios.get(`http://localhost:5144/api/Cliente/${data.dni}`);

            const clienteData = response.data;
            console.log("Respuesta de la API recibida:", clienteData);

            // 2. ALMACENAR LOS DATOS EN LOCALSTORAGE
            localStorage.setItem('datosCliente', JSON.stringify(clienteData));

            navigate('/secciones');

        } catch (error) {
            console.error("Error al consultar la API:", error);
            localStorage.removeItem('datosCliente');

            if (error.response) {
                alert(`Error: No se pudo encontrar el cliente con DNI ${data.dni}. (Status: ${error.response.status})`);
            } else if (error.request) {
                alert("Error de conexión: No se pudo comunicar con el servidor. Verifica que la API esté en línea.");
            } else {
                alert("Ocurrió un error inesperado al realizar la consulta.");
            }
        }
    };

    return (
        // <ThemeProvider theme={theme}>
        //     <CssBaseline />
            <Box
                sx={{
                    bgcolor: '#fafafa',
                    minHeight: 'calc(100vh - 150px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: { xs: 2, md: 4 }
                }}
            >
                <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', height: '100%' }}>
                    <Grid
                        container
                        spacing={4}
                        alignItems="stretch"
                        justifyContent="center"
                        sx={{ width: '100%' }}
                    >
                        {/* CARD */}
                        <Grid item xs={12} md={8}>
                            <Card sx={{
                                borderRadius: 4,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <CardHeader
                                    title="Bienvenido/a"
                                    titleTypographyProps={{
                                        variant: 'h4',
                                        fontSize: '3.5rem',
                                        fontWeight: 'bold',
                                        align: 'center',
                                    }}
                                    sx={{
                                        background: 'linear-gradient(60deg, #742d84, #8e24aa)',
                                        color: '#fff',
                                        textAlign: 'center',
                                        borderTopLeftRadius: 20,
                                        borderTopRightRadius: 20,
                                        py: 2
                                    }}
                                />
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        flexGrow: 1,
                                        p: { xs: 2, md: 3 }
                                    }}
                                >
                                    <Typography align="center" fontWeight="bold" variant="h6">
                                        INGRESE SU DNI
                                    </Typography>
                                    <Box
                                        component="form"
                                        onSubmit={handleSubmit(onSubmit)}
                                        noValidate
                                        autoComplete="off"
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flexGrow: 1,
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <div>
                                            <Controller
                                                name="dni"
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        value={currentDniValue}
                                                        inputProps={{
                                                            readOnly: true,
                                                            style: {
                                                                textAlign: 'center',
                                                                fontSize: '3.0rem',
                                                                letterSpacing: '0.1em'
                                                            }
                                                        }}
                                                        fullWidth
                                                        variant="outlined"
                                                        error={!!errors.dni}
                                                        sx={{
                                                            input: {
                                                                bgcolor: '#085a3c',
                                                                color: '#fff',
                                                                borderRadius: 1,
                                                                p: 2,
                                                                height: 'auto'
                                                            },
                                                            mb: errors.dni ? 0.5 : 2,
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors.dni && (
                                                <FormHelperText
                                                    sx={{ color: '#c00', textAlign: 'center', mt: 1, mb: 1.5, fontSize: '0.875rem' }}
                                                >
                                                    {errors.dni.message}
                                                </FormHelperText>
                                            )}
                                        </div>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                bgcolor: '#f9cc06',
                                                color: '#085a3c',
                                                borderRadius: 2,
                                                fontWeight: 'bold',
                                                '&:hover': { bgcolor: '#ffdd33' },
                                                mt: 'auto',
                                                py: 1.5
                                            }}
                                        >
                                            Continuar
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* TECLADO */}
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: 1,
                                    bgcolor: '#fff',
                                    borderRadius: 5,
                                    p: 2,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    height: '100%'
                                }}
                            >
                                {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
                                    <KeypadButton
                                        key={num}
                                        onClick={() => onNumberClick(num.toString())}
                                    >
                                        {num}
                                    </KeypadButton>
                                ))}
                                <KeypadButton
                                    onClick={onBackspace}
                                    sx={{
                                        gridColumn: '2 / span 2',
                                        bgcolor: '#dc3545',
                                        fontSize: '30px',
                                        fontWeight: 'bold',
                                        '&:hover': { bgcolor: '#c82333' },
                                    }}
                                >
                                    BORRAR
                                </KeypadButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        // </ThemeProvider>
    );
};

export default Home;