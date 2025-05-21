import { useChains } from '../hooks/use-chains.tsx';
import { ChainTable } from './ChainTable.tsx';
import { Box, IconButton, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export const Dashboard = () => {
  const {
    chainParams: parachains,
    isLoading: isParachainsLoading,
    error: parachainError,
    fetchData: fetchParachains,
  } = useChains([
    'https://stagebox.tanssi-dev.network',
    'https://fraa-flashbox-rpc.a.stagenet.tanssi.network',
    'https://dancebox.tanssi-api.network',
  ]);
  const {
    chainParams: relaychains,
    isLoading: isRelaychainsLoading,
    error: relaychainError,
    fetchData: fetchRelaychains,
  } = useChains(['https://stagelight.tanssi-dev.network', 'https://dancelight.tanssi-api.network']);

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Tanssi chains visualization
        </Typography>
        <Box pl="5px">
          <IconButton
            onClick={() => {
              fetchParachains();
              fetchRelaychains();
            }}
          >
            <AutorenewIcon />
          </IconButton>
        </Box>
      </Box>
      <ChainTable title="Parachains" data={parachains} isLoading={isParachainsLoading} error={parachainError} />
      <ChainTable title="Relaychains" data={relaychains} isLoading={isRelaychainsLoading} error={relaychainError} />
    </Box>
  );
};
