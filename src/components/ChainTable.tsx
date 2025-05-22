import type { ChainParamsType } from '../types/chain-params.type.ts';
import {
  alpha,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Link,
} from '@mui/material';
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
  const errorColor = alpha(theme.palette.error.main, 0.1);
  const successColor = alpha(theme.palette.success.main, 0.1);

  return (
    <Box pt="20px">
      <Typography variant="h5">{title}</Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: (theme) => theme.palette.action.hover,
                '& .MuiTableCell-head': {
                  fontWeight: 'bold',
                },
              }}
            >
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
                  <TableCell
                    sx={{
                      backgroundColor: chain.currentClient === chain.latestClient ? successColor : errorColor,
                    }}
                  >
                    {chain.currentClient}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: chain.currentClient === chain.latestClient ? successColor : errorColor,
                    }}
                  >
                    {chain.latestClient}{' '}
                    {chain.clientReleaseUrl && (
                      <Link target="_blank" href={chain.clientReleaseUrl}>
                        (release)
                      </Link>
                    )}
                  </TableCell>

                  {/* currentRuntime vs latestRuntime */}
                  <TableCell
                    sx={{
                      backgroundColor:
                        parseInt(chain.currentRuntime) < parseInt(chain.latestRuntime) ? errorColor : successColor,
                    }}
                  >
                    {chain.currentRuntime}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor:
                        parseInt(chain.currentRuntime) < parseInt(chain.latestRuntime) ? errorColor : successColor,
                    }}
                  >
                    {chain.latestRuntime}{' '}
                    {chain.runtimeReleaseUrl && (
                      <Link target="_blank" href={chain.runtimeReleaseUrl}>
                        (release)
                      </Link>
                    )}
                  </TableCell>
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
