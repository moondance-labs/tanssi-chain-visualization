import { useState, useMemo } from 'react';
import { createTheme, responsiveFontSizes, type Theme } from '@mui/material';

export type Mode = 'light' | 'dark';

const getStoredMode = (): Mode => {
  const stored = localStorage.getItem('themeMode');

  return stored === 'dark' ? 'dark' : 'light';
};

export const useMode = (): {
  mode: Mode;
  theme: Theme;
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
          primary: {
            main: mode === 'light' ? '#56B3B5' : '#90caf9',
            contrastText: '#fff',
          },
        },
      }),
    );
  }, [mode]);

  return { mode, theme, toggleMode };
};
