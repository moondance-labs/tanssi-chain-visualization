import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Dashboard } from './components/Dashboard.tsx';
import { ThemeSwitcher } from './components/ThemeSwitcher.tsx';
import { useMode } from './hooks/use-mode.tsx';

function App() {
  const { mode, theme, toggleMode } = useMode();

  return (
    <Container maxWidth="xl" disableGutters style={{ margin: '10px' }}>
      <ThemeProvider theme={theme}>
        <ThemeSwitcher onToggle={toggleMode} currentMode={mode} />
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
    </Container>
  );
}

export default App;
