import type { BaseSyntheticEvent } from 'react';
import { Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';

import DniInput from '@/components/input/Dni';
import BotonAccion from '@/components/botones/BotonAccion';
import type { DniFormValues } from '@/validations/dniSchema';

interface DniFormProps {
  onSubmit: (data: DniFormValues, event?: BaseSyntheticEvent) => void;
  currentDniValue: string;
}

const DniForm = ({ onSubmit, currentDniValue }: DniFormProps) => {
  const theme = useTheme();
  const { handleSubmit } = useFormContext<DniFormValues>();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}
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
        <DniInput currentDniValue={currentDniValue} />
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
    </Box>
  );
};

export default DniForm;