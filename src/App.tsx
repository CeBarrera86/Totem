import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import appTheme from '@/assets/styles/Themes';
import Footer from '@/components/layout/Footer';
import GlobalErrorBanner from '@/components/layout/GlobalErrorBanner';
import Navbar from '@/components/layout/Navbar';
import NetworkStatus from '@/components/layout/NetworkStatus';
import RouteFallback from '@/components/layout/RouteFallback';

const Home = lazy(() => import('@/views/Home'));
const Index = lazy(() => import('@/views/Index'));
const Secciones = lazy(() => import('@/views/Secciones'));
const Tramites = lazy(() => import('@/views/Tramites'));

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            '--appHeaderHeight': { xs: '78px', sm: '84px', md: '90px' },
            '--appFooterHeight': { xs: '78px', sm: '84px', md: '90px' },
          }}
        >
          <Navbar />
          <NetworkStatus />
          <GlobalErrorBanner />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              mt: 'var(--appHeaderHeight)',
              mb: 'var(--appFooterHeight)',
            }}
          >
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/index" element={<Index />} />
                <Route path="/secciones" element={<Secciones />} />
                <Route path="/tramites" element={<Tramites />} />
              </Routes>
            </Suspense>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;