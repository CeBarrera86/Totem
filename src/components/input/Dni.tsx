import { useState } from 'react';
import { TextField, FormHelperText, Box } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';

import type { DniFormValues } from '@/validations/dniSchema';

interface DniInputProps {
  currentDniValue: string;
}

const DniInput = ({ currentDniValue }: DniInputProps) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext<DniFormValues>();

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                fontWeight: 'bolder',
                color: theme.palette.common.white,
                outline: 'none',
              },
            }}
            fullWidth
            variant="outlined"
            error={Boolean(errors.dni)}
            autoFocus
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            sx={{
              '& input': {
                fontSize: { xs: '3rem', sm: '4rem', md: '6rem' },
                letterSpacing: { xs: '0.05em', sm: '0.08em', md: '0.1em' },
              },
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
      <Box
        sx={{
          width: 'calc(100% - 32px)',
          height: '2px',
          bgcolor: isFocused ? theme.palette.corpico.naranja : 'white',
          mb: errors.dni ? 0.5 : 1,
        }}
      />
      {/* Mensaje de error de validación */}
      {errors.dni && (
        <FormHelperText sx={{ color: theme.palette.error.main, textAlign: 'center', mt: 0.5, fontSize: '0.875rem' }}>
          {errors.dni.message}
        </FormHelperText>
      )}
    </Box>
  );
};

export default DniInput;