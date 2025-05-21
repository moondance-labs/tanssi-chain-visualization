import { Dashboard } from './components/Dashboard.tsx';
import { Container, createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import { ThemeSwitcher } from './components/ThemeSwitcher.tsx';

function App() {
  const defaultTheme = () =>
    responsiveFontSizes(
      createTheme({
        palette: {
          mode: 'light',
        },
      }),
    );
  const [theme, setTheme] = useState(defaultTheme());
  const onSwitcherToggle = (mode: 'light' | 'dark') => {
    const theme = () =>
      createTheme({
        palette: {
          mode,
        },
      });
    setTheme(theme);
  };

  return (
    <Container maxWidth="xl" disableGutters style={{ margin: '10px' }}>
      <ThemeProvider theme={theme}>
        <ThemeSwitcher onToggle={onSwitcherToggle} />
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
    </Container>
  );
}

export default App;
