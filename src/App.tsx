import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';

import { Dashboard } from './components/Dashboard.tsx';
import { AppHeader } from './components/AppHeader.tsx';
import { useMode } from './hooks/use-mode.tsx';
import { PalletErrorChecker } from './components/PalletErrorChecker.tsx';
import { ChopsticksTool } from './components/ChopsticksTool.tsx';

function App() {
  const { theme, toggleMode, mode } = useMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <AppHeader theme={theme} mode={mode} toggleMode={toggleMode} />
        <Container
          sx={{ p: 2 }}
          maxWidth="xl"
          disableGutters
          style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '70px' }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pallet-errors" element={<PalletErrorChecker />} />
            <Route path="/chopsticks-tool" element={<ChopsticksTool />} />
          </Routes>
        </Container>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
