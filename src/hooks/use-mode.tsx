import { useState, useMemo } from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material';

type Mode = 'light' | 'dark';

const getStoredMode = (): Mode => {
  const stored = localStorage.getItem('themeMode');

  return stored === 'dark' ? 'dark' : 'light';
};

export const useMode = (): {
  mode: Mode;
  theme: any;
  toggleMode: (newMode: Mode) => void;
} => {
  const [mode, setMode] = useState<Mode>(getStoredMode);

  const toggleMode = (newMode: Mode) => {
    localStorage.setItem('themeMode', newMode);
    setMode(newMode);
  };

  const theme = useMemo(() => {
    return responsiveFontSizes(
      createTheme({
        palette: {
          mode,
        },
      }),
    );
  }, [mode]);

  return { mode, theme, toggleMode };
};
