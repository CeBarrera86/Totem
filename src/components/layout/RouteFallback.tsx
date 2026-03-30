import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const RouteFallback = () => {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - var(--appHeaderHeight) - var(--appFooterHeight))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <CircularProgress size={56} thickness={4.5} />
      <Typography variant="h6" color="text.secondary">
        Cargando pantalla...
      </Typography>
    </Box>
  );
};

export default RouteFallback;