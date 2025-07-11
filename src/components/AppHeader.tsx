import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material';
import { ThemeSwitcher } from './ThemeSwitcher.tsx';
import type { Mode } from '../hooks/use-mode.tsx';

const pages = [
  { label: 'Dashboard', path: '#/dashboard' },
  { label: 'Pallet Error Checker', path: '#/pallet-errors' },
];

export const AppHeader = ({
  theme,
  toggleMode,
  mode,
}: {
  mode: Mode;
  theme: Theme;
  toggleMode: (newMode: Mode) => void;
}) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path: string) => {
    window.location.href = path;
    handleCloseNavMenu();
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src="./logo.png" alt="Logo" style={{ height: 40, objectFit: 'contain' }} />
        </Box>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={() => handleNavigate(page.path)}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {pages.map((page) => (
              <Button key={page.label} onClick={() => handleNavigate(page.path)} sx={{ color: 'white' }}>
                {page.label}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ ml: '15px', pl: '15px', alignItems: 'center', display: 'flex' }}>
          <ThemeSwitcher onToggle={toggleMode} currentMode={mode} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
