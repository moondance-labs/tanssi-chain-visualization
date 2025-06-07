import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export const ThemeSwitcher = ({
  onToggle,
  currentMode,
}: {
  onToggle: (mode: 'light' | 'dark') => void;
  currentMode: 'light' | 'dark';
}) => {
  return (
    <IconButton
      onClick={() => onToggle(currentMode === 'light' ? 'dark' : 'light')}
      color="inherit"
      sx={{ position: 'fixed', right: '15px' }}
    >
      {currentMode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
};
