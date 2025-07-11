import { useChains } from '../hooks/use-chains.tsx';
import { ChainTable } from './ChainTable.tsx';
import { Box, IconButton, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { keyframes } from '@mui/system';
import { parachainUrls, relaychainUrls } from '../constants/url.ts';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(900deg); }
`;

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
          Chains dashboard
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
