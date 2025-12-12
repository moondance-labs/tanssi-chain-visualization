import { Box, Typography, TextField, Button, CircularProgress, Paper, Stack, Alert } from '@mui/material';
import { useErrorChecker } from '../hooks/use-error-checker.tsx';
import { NetworkSelector } from './NetworkSelector.tsx';

export const PalletErrorChecker = () => {
  const {
    handleCheckError,
    moduleIndex,
    errorIndex,
    result,
    loading,
    error,
    setModuleIndex,
    setErrorIndex,
    setNetworkUrl,
    networkUrl,
  } = useErrorChecker();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pallet Error Checker
      </Typography>

      <NetworkSelector onChange={(url: string) => setNetworkUrl(url)} />

      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="Module Index"
          type="number"
          value={moduleIndex}
          onChange={(e) => setModuleIndex(e.target.value)}
          fullWidth
        />
        <TextField
          label="Error Index"
          value={errorIndex}
          onChange={(e) => setErrorIndex(e.target.value)}
          fullWidth
          placeholder="0x01000000"
        />
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleCheckError}
        disabled={loading || !networkUrl || !moduleIndex || !errorIndex}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : 'Find Error'}
      </Button>

      {error && (
        <Box mt={3}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {result && (
        <Box mt={3}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight="bold">
                Error Details:
              </Typography>
              <Typography variant="body1">
                <strong>Section:</strong> {result.section}
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {result.name}
              </Typography>
              <Typography variant="body1">
                <strong>Method:</strong> {result.method}
              </Typography>
              <Typography variant="body1">
                <strong>Docs:</strong> {result.docs}
              </Typography>
            </Stack>
          </Paper>
        </Box>
      )}
    </Box>
  );
};
