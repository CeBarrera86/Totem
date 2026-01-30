import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NetworkStatus from '@/components/layout/NetworkStatus';
import GlobalErrorBanner from '@/components/layout/GlobalErrorBanner';
import Index from '@/views/Index';
import Home from '@/views/Home';
import Secciones from '@/views/Secciones';
import Tramites from '@/views/Tramites';
import appTheme from '@/assets/styles/Themes';

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <NetworkStatus />
          <GlobalErrorBanner />
          <Box component="main" sx={{ flexGrow: 1, mt: '75px', mb: '75px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/index" element={<Index />} />
              <Route path="/secciones" element={<Secciones />} />
              <Route path="/tramites" element={<Tramites />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;