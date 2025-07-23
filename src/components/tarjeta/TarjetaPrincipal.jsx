// src/components/tarjeta/TarjetaPrincipal.jsx
import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
// No es necesario useTheme aquí porque los estilos del CardHeader y Card
// se definen globalmente en Themes.jsx a través de MuiCardHeader y MuiCard styleOverrides.

const TarjetaPrincipal = ({ titulo, subtitulo, children, ...props }) => {
  return (
    <Card sx={{
      // Los estilos de borderRadius, boxShadow, backgroundColor, color, etc.
      // para la Card ya se aplican globalmente a través de MuiCard en Themes.jsx.
      // Si necesitas sobrescribir algo aquí, hazlo con `sx`.
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }} {...props}>
      {titulo && (
        <CardHeader
          title={titulo}
          subheader={subtitulo}
          subheaderTypographyProps={{ color: 'inherit' }}
          // Los estilos de background, boxShadow, borderRadius, etc. para CardHeader
          // ya se aplican globalmente a través de MuiCardHeader en Themes.jsx.
        />
      )}
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
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