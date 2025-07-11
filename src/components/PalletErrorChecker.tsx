import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Paper,
  Stack,
  Alert,
} from '@mui/material';
import { useErrorChecker } from '../hooks/use-error-checker.tsx';

export const PalletErrorChecker = () => {
  const {
    handleCheckError,
    selectedNetwork,
    customUrl,
    moduleIndex,
    errorIndex,
    result,
    loading,
    error,
    setSelectedNetwork,
    setCustomUrl,
    setModuleIndex,
    setErrorIndex,
    networks,
  } = useErrorChecker();

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Pallet Error Checker
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Network</InputLabel>
        <Select value={selectedNetwork} label="Network" onChange={(e) => setSelectedNetwork(e.target.value)}>
          {networks.map((net) => (
            <MenuItem key={net.name} value={net.name}>
              {net.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedNetwork === 'Custom' && (
        <TextField
          fullWidth
          margin="normal"
          label="Custom WebSocket URL"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
        />
      )}

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
        disabled={loading || !selectedNetwork || !moduleIndex || !errorIndex}
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
