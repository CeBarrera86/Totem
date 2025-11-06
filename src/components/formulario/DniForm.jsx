import React from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';

import DniInput from '../input/Dni';
import BotonAccion from '../botones/BotonAccion';

const DniForm = ({ onSubmit, currentDniValue }) => {
  const theme = useTheme();
  const { handleSubmit, formState: { errors } } = useFormContext();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.success.dark,
          borderRadius: 2,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <DniInput errors={errors} currentDniValue={currentDniValue} />
        <BotonAccion
          type="submit"
          buttonColor="warning"
          sx={{
            fontSize: '1.5rem',
            width: 'auto',
            minWidth: '300px',
            letterSpacing: '0.1em',
          }}
        >
          CONTINUAR
        </BotonAccion>
      </Box>
    </form>
  );
};

export default DniForm;