import { Box } from '@mui/material';
import { memo, type MouseEvent,useCallback } from 'react';

import BotonTeclado from '@/components/teclado/BotonTeclado';

interface TecladoProps {
  onNumberClick: (value: string) => void;
  onBackspace: () => void;
}

const DIGITS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

const Teclado = memo(({ onNumberClick, onBackspace }: TecladoProps) => {
  const handleDigitClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const digit = event.currentTarget.dataset.digit;
      if (digit) {
        onNumberClick(digit);
      }
    },
    [onNumberClick]
  );

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1,
        bgcolor: '#fff',
        borderRadius: 5,
        p: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        height: '100%',
      }}
    >
      {DIGITS.map((num) => (
        <BotonTeclado key={num} data-digit={num.toString()} onClick={handleDigitClick}>
          {num}
        </BotonTeclado>
      ))}
      <BotonTeclado
        onClick={onBackspace}
        sx={{
          gridColumn: '2 / span 2',
          bgcolor: '#dc3545',
          fontSize: '40px',
          fontWeight: 'bold',
          '&:hover': { bgcolor: '#c82333' },
        }}
      >
        BORRAR
      </BotonTeclado>
    </Box>
  );
});

Teclado.displayName = 'Teclado';

export default Teclado;