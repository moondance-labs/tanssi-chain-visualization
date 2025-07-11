import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { NetworkSelector } from './NetworkSelector.tsx';

export const ChopsticksTool = () => {
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeSrc, setIframeSrc] = useState('');
  const [isReady, setIsReady] = useState(false);

  const handleNetworkChange = (url: string) => {
    if (!url) {
      return;
    }

    setIsReady(false);
    const encoded = encodeURIComponent(url);
    const src = `https://tmpolaczyk.github.io/chopsticks-web/#/?endpoint=${encoded}`;

    setIframeSrc(src);
    setIframeKey((k) => k + 1);

    // The chopsticks tool doesn't rerender component based on URL in place, we need to force it to reload
    setTimeout(() => {
      setIframeSrc(src);
      setIframeKey((k) => k + 1);
      setIsReady(true);
    }, 1000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Chopsticks Web Tool
      </Typography>

      <NetworkSelector onChange={handleNetworkChange} />

      {iframeSrc && (
        <Paper elevation={3} sx={{ mt: 3, height: '80vh', overflow: 'hidden', display: isReady ? 'block' : 'none' }}>
          <iframe
            key={iframeKey}
            title="Chopsticks Web"
            src={iframeSrc}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </Paper>
      )}
    </Box>
  );
};
