import { Box, Typography, TextField, Button, CircularProgress, Paper, Stack, Alert, Tooltip } from '@mui/material';
import { useParaTankAccount } from '../hooks/use-para-tank-account.tsx';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

export const ParaTankAccount = () => {
  const { handleCheckError, setParaId, result, loading, error, paraId, copied, handleCopy } = useParaTankAccount();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Parachain Tank Account
      </Typography>

      <Box display="flex">
        <TextField
          label="Enter Parahcain ID"
          type="number"
          value={paraId}
          onChange={(e) => setParaId(e.target.value)}
          fullWidth
        />
      </Box>

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleCheckError} disabled={loading || !paraId} fullWidth>
        {loading ? <CircularProgress size={24} /> : 'Submit'}
      </Button>

      {error && (
        <Box mt={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {result && (
        <Box mt={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h6" fontWeight="bold">
                Tank Account Details:
              </Typography>
              <Box>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Account Address:
                  </Typography>
                  <Tooltip title={copied ? 'Copied!' : 'Copy address'}>
                    <IconButton size="small" onClick={handleCopy} color={copied ? 'success' : 'default'}>
                      {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Paper
                  variant="outlined"
                  sx={{
                    padding: 1.5,
                    backgroundColor: '#f5f5f5',
                    wordBreak: 'break-all',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                  }}
                >
                  {result.address}
                </Paper>
              </Box>
            </Stack>
          </Paper>
        </Box>
      )}
    </Box>
  );
};
