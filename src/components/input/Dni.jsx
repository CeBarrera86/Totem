import React, { useState } from 'react';
import { TextField, FormHelperText, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';

const DniInput = ({ control, errors, currentDniValue }) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Controller name="dni" control={control}
        render={({ field }) => (
          <TextField {...field}
            value={currentDniValue}
            inputProps={{
              readOnly: true,
              style: {
                textAlign: 'center',
                fontSize: '6rem',
                fontWeight: 'bolder',
                letterSpacing: '0.1em',
                color: theme.palette.common.white,
                outline: 'none',
              }
            }}
            fullWidth
            variant="outlined"
            error={!!errors.dni}
            autoFocus
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              backgroundColor: 'transparent',
            }}
          />
        )}
      />
      {/* Línea debajo del DNI */}
      <Box sx={{
        width: 'calc(100% - 32px)',
        height: '2px',
        bgcolor: isFocused ? theme.palette.corpico.naranja : 'white',
        mb: errors.dni ? 0.5 : 1,
      }} />
      {/* Mensaje de error de validación */}
      {errors.dni && (
        <FormHelperText sx={{ color: theme.palette.error.main, textAlign: 'center', mt: 0.5, fontSize: '0.875rem' }} >
          {errors.dni.message}
        </FormHelperText>
      )}
    </Box>
  );
};

export default DniInput;