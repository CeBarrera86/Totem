import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Index from './views/Index';
// import Home from './views/Home';
// import Secciones from './views/Secciones';
// import Tramites from './views/Tramites';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import appTheme from './assets/styles/Themes';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, mt: '75px', mb: '75px' }}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* <Route path="/" element={<Home />} />
              <Route path="/secciones" element={<Secciones />} />
              <Route path="/tramites" element={<Tramites />} /> */}
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;