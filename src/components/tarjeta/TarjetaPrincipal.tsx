import { ReactNode } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';

interface TarjetaPrincipalProps {
  titulo?: ReactNode;
  subtitulo?: ReactNode;
  children: ReactNode;
}

const TarjetaPrincipal = ({ titulo, subtitulo, children, ...props }: TarjetaPrincipalProps) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} {...props}>
      {titulo && <CardHeader title={titulo} subheader={subtitulo} subheaderTypographyProps={{ color: 'inherit' }} />}
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default TarjetaPrincipal;