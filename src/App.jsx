// Totem/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Secciones from './views/Secciones';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
            contrastText: '#fff',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#121212',
            paper: '#212121',
        },
        warning: {
            main: '#f9cc06',
            contrastText: '#085a3c',
        },
        success: {
            main: '#d4edda',
            contrastText: '#085a3c',
            light: '#e6ffe6',
            dark: '#004d00',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif', // Keep this here to apply the font family
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                /* REMOVE THE @IMPORT RULE FROM HERE */
                /* @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap'); */
                html, body, #root {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
            `
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(60deg, #742d84, #8e24aa)',
                    boxShadow: '0 4px 20px 0 rgba(0, 0, 0, .14), 0 7px 10px -5px rgba(156, 39, 176, .4)',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '20px',
                    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12)',
                    backgroundColor: '#fff',
                    color: '#333',
                    wordWrap: 'break-word',
                    backgroundClip: 'border-box',
                    border: '1px solid #eee',
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    position: 'relative',
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    backgroundColor: '#d4edda',
                    color: '#085a3c',
                    borderColor: '#c3e6cb',
                },
                icon: {
                    color: '#085a3c !important',
                }
            }
        }
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Navbar />
                    <Box component="main" sx={{ flexGrow: 1, mt: '75px', mb: '75px' }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/secciones" element={<Secciones />} />
                        </Routes>
                    </Box>
                    <Footer />
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;