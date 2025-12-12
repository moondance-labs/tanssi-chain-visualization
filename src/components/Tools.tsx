import { useState } from 'react';
import { PalletErrorChecker } from './PalletErrorChecker.tsx';
import { ParaTankAccount } from './ParaTankAccount.tsx';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const Tools = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', width: '100%', maxWidth: 500 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<ErrorOutlineIcon />} label="Pallet Error Checker" iconPosition="start" />
          <Tab icon={<AccountBalanceWalletIcon />} label="Tank Account" iconPosition="start" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && <PalletErrorChecker />}
          {activeTab === 1 && <ParaTankAccount />}
        </Box>
      </Paper>
    </Box>
  );
};
