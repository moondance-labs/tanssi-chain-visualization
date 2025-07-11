import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNetworkSelector } from '../hooks/use-network-selector.tsx';

export const NetworkSelector = ({ onChange }: { onChange: (url: string) => void }) => {
  const { networks, selectedNetwork, customUrl, onUrlChange, onCustomUrlChange, customName } =
    useNetworkSelector(onChange);

  return (
    <>
      <FormControl fullWidth margin="normal">
        <InputLabel>Network</InputLabel>
        <Select value={selectedNetwork} label="Network" onChange={(e) => onUrlChange(e.target.value)}>
          {networks.map((net) => (
            <MenuItem key={net.name} value={net.name}>
              {net.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedNetwork === customName && (
        <TextField
          fullWidth
          margin="normal"
          label="Custom WebSocket URL"
          value={customUrl}
          onChange={(e) => onCustomUrlChange(e.target.value)}
        />
      )}
    </>
  );
};
