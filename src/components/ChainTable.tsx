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
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { POLKADOT_EXPLORER_BASE_URL } from '../constants/url.ts';
import { CollapsibleRow } from './CollapsibleRow.tsx';
import { Fragment, useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { substrateNetworkToSubscanUrl } from '../mappers/substrate-chain-name.mapper.ts';

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
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  const toggleOpenedIndex = (index: number) => {
    openedIndex === index ? setOpenedIndex(null) : setOpenedIndex(index);
  };

  const expandRow = (index: number, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    toggleOpenedIndex(index);
  };

  return (
    <Box pt="20px">
      <Typography variant="h5">{title}</Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small">
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {error && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="error">{error}</Typography>
                </TableCell>
              </TableRow>
            )}
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.map((chain, index) => {
                const subscanUrl = substrateNetworkToSubscanUrl(chain.substrateNetwork);

                return (
                  <Fragment key={index}>
                    <TableRow
                      onClick={expandRow.bind(null, index)}
                      key={chain.substrateNetwork}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                          cursor: 'pointer',
                        },
                      }}
                    >
                      <TableCell>
                        {chain.substrateNetwork}{' '}
                        <IconButton
                          onClick={(e: React.MouseEvent<HTMLElement>) => {
                            e.stopPropagation();

                            window.open(
                              `${POLKADOT_EXPLORER_BASE_URL}/apps/?rpc=${chain.url.replace('https', 'wss')}`,
                              '_blank',
                            );
                          }}
                        >
                          <img
                            src="./icon_polkadot.ico"
                            alt="polkadot explorer icon"
                            style={{ width: 15, height: 15 }}
                          />
                        </IconButton>
                        {subscanUrl && (
                          <IconButton
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                              e.stopPropagation();

                              window.open(subscanUrl, '_blank');
                            }}
                          >
                            <img
                              src="./icon_subscan.png"
                              alt="polkadot explorer icon"
                              style={{ width: 15, height: 15 }}
                            />
                          </IconButton>
                        )}
                      </TableCell>
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
                          <Link target="_blank" href={chain.clientReleaseUrl} onClick={(e) => e.stopPropagation()}>
                            (release)
                          </Link>
                        )}
                      </TableCell>

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
                          <Link target="_blank" href={chain.runtimeReleaseUrl} onClick={(e) => e.stopPropagation()}>
                            (release)
                          </Link>
                        )}
                      </TableCell>
                      <TableCell>{chain.lastBlock}</TableCell>
                      <TableCell width="100px" align="center">
                        {chain.contracts && (
                          <IconButton size="small" onClick={expandRow.bind(null, index)}>
                            {openedIndex === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                    {chain.contracts && (
                      <CollapsibleRow
                        contractParams={chain.contracts}
                        ethNetwork={chain.ethereumNetwork}
                        isOpen={openedIndex === index}
                      />
                    )}
                  </Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
