import { useChains } from '../hooks/use-chains.tsx';
import { ChainTable } from './ChainTable.tsx';
import { Box, IconButton, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { keyframes } from '@mui/system';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(900deg); }
`;

const parachainUrls = [
  'https://stagebox.tanssi-dev.network',
  'https://fraa-flashbox-rpc.a.stagenet.tanssi.network',
  'https://dancebox.tanssi-api.network',
];

const relaychainUrls = [
  'https://stagelight.tanssi-dev.network',
  'https://dancelight.tanssi-api.network',
  'https://moonlight.tanssi-dev.network',
  'https://tanssi.tanssi-api.network',
];

export const Dashboard = () => {
  const {
    chainParams: parachains,
    isLoading: isParachainsLoading,
    error: parachainError,
    fetchData: fetchParachains,
  } = useChains(parachainUrls);
  const {
    chainParams: relaychains,
    isLoading: isRelaychainsLoading,
    error: relaychainError,
    fetchData: fetchRelaychains,
  } = useChains(relaychainUrls);

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
            <AutorenewIcon
              sx={{
                animation: isParachainsLoading || isRelaychainsLoading ? `${spin} 1s linear infinite` : 'none',
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <ChainTable title="Parachains" data={parachains} isLoading={isParachainsLoading} error={parachainError} />
      <ChainTable title="Relaychains" data={relaychains} isLoading={isRelaychainsLoading} error={relaychainError} />
    </Box>
  );
};
