import { Alert, AlertTitle, Box, Button } from '@mui/material';

import { useGlobalApiError } from '@/hooks/useGlobalApiError';

const GlobalErrorBanner = () => {
  const { error, clearError } = useGlobalApiError();

  if (!error) return null;

  return (
    <Box sx={{ position: 'sticky', top: 115, zIndex: 1200 }}>
      <Alert
        severity="error"
        variant="filled"
        action={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" size="small" onClick={clearError}>
              OCULTAR
            </Button>
            <Button color="inherit" size="small" onClick={() => window.location.reload()}>
              REINTENTAR
            </Button>
          </Box>
        }
      >
        <AlertTitle>Sin conexión con el servidor</AlertTitle>
        {error.message}
      </Alert>
    </Box>
  );
};

export default GlobalErrorBanner;