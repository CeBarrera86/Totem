import { Alert, Box } from '@mui/material';

import { useNetworkStatus } from '@/hooks/useNetworkStatus';

const NetworkStatus = () => {
  const { isOnline } = useNetworkStatus();

  if (isOnline) return null;

  return (
    <Box sx={{ position: 'sticky', top: 75, zIndex: 1200 }}>
      <Alert severity="warning" variant="filled">
        Sin conexión a la red. Verifique el estado de la red interna.
      </Alert>
    </Box>
  );
};

export default NetworkStatus;