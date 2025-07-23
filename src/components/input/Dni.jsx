// src/components/input/Dni.jsx
import React from 'react';
import { TextField, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTheme } from '@mui/material/styles'; // Importa useTheme

const DniInput = ({ control, errors, currentDniValue }) => {
  const theme = useTheme(); // Accede al tema

  return (
    <div>
      <Controller
        name="dni"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={currentDniValue}
            inputProps={{
              readOnly: true,
              style: {
                textAlign: 'center',
                fontSize: '3.0rem',
                letterSpacing: '0.1em'
              }
            }}
            fullWidth
            variant="outlined"
            error={!!errors.dni}
            sx={{
              input: {
                bgcolor: theme.palette.success.dark, // Usando color del tema
                color: theme.palette.common.white, // Usando color del tema
                borderRadius: 1,
                p: 2,
                height: 'auto'
              },
              mb: errors.dni ? 0.5 : 2,
            }}
          />
        )}
      />
      {errors.dni && (
        <FormHelperText
          sx={{ color: theme.palette.error.main, textAlign: 'center', mt: 1, mb: 1.5, fontSize: '0.875rem' }} // Usando color del tema
        >
          {errors.dni.message}
        </FormHelperText>
      )}
    </div>
  );
};

export default DniInput;