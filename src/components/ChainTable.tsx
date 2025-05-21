import type { ChainParamsType } from '../types/chain-params.type.ts';
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const ChainTable = ({
  title,
  data,
  isLoading,
  error,
}: {
  title: string;
  data: ChainParamsType[];
  isLoading: boolean;
  error: string;
}) => {
  const theme = useTheme();

  return (
    <Box pt="20px">
      <Typography variant="h5">{title}</Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: '280px' }}>Network</TableCell>
              <TableCell>Current Client</TableCell>
              <TableCell>Latest Client</TableCell>
              <TableCell>Current Runtime</TableCell>
              <TableCell>Latest Runtime</TableCell>
              <TableCell>Last Block</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {error && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="error">{error}</Typography>
                </TableCell>
              </TableRow>
            )}
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.map((chain) => (
                <TableRow
                  key={chain.network}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell>{chain.network}</TableCell>
                  <TableCell>{chain.currentClient}</TableCell>
                  <TableCell>{chain.latestClient}</TableCell>
                  <TableCell>{chain.currentRuntime}</TableCell>
                  <TableCell>{chain.latestRuntime}</TableCell>
                  <TableCell>{chain.lastBlock}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
