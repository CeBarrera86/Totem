import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface ContenedorPrincipalProps {
  children: ReactNode;
}

const ContenedorPrincipal = ({ children }: ContenedorPrincipalProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: 'calc(100vh - var(--appHeaderHeight) - var(--appFooterHeight))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 1.5, sm: 2, md: 3 },
      }}
    >
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', height: '100%' }}>
        {children}
      </Container>
    </Box>
  );
};

export default ContenedorPrincipal;