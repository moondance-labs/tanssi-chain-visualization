import { Box, Collapse, Divider, TableCell, TableRow, Typography, Paper, Card, CardContent } from '@mui/material';
import type { ContractParamsType } from '../types/contract-params.type.ts';
import { ETHERSCAN_BASE_URL } from '../constants/url.ts';
import { StyledChip } from './StyledChip.tsx';
import { useTheme } from '@mui/material/styles';

export const CollapsibleRow = ({ contractParams, isOpen }: { contractParams: ContractParamsType; isOpen: boolean }) => {
  if (!isOpen) return null;
  const theme = useTheme();

  const sectionBoxStyle = {
    flex: 1,
    p: 2,
    minWidth: 200,
    maxHeight: 250,
    overflowY: 'auto',
  };

  const paperBackgroundColor = theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper;

  return (
    <TableRow>
      <TableCell colSpan={7} sx={{ p: 0 }}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Paper elevation={2} sx={{ m: 2, p: 2 }}>
            <Box display="flex" gap={2} flexWrap="wrap">
              <Box sx={sectionBoxStyle}>
                <Typography variant="subtitle1" gutterBottom>
                  Contracts
                </Typography>
                <Divider sx={{ mb: 1 }} />
                {contractParams.contracts.length > 0 && (
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {contractParams.contracts.map((c, idx) => (
                      <StyledChip key={idx} label={c.name} href={`${ETHERSCAN_BASE_URL}/address/${c.address}`} />
                    ))}
                  </Box>
                )}
              </Box>

              {contractParams.collaterals.length > 0 && (
                <Box sx={sectionBoxStyle}>
                  <Typography variant="subtitle1" gutterBottom>
                    Collaterals ({contractParams.collaterals.length})
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Box display="block">
                    {contractParams.collaterals.map((c, index) => (
                      <Box key={index} sx={{ pb: '10px' }}>
                        <StyledChip label={c.name} href={`${ETHERSCAN_BASE_URL}/address/${c.address}`} />{' '}
                        <StyledChip label={`Oracle`} href={`${ETHERSCAN_BASE_URL}/address/${c.oracle}`} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {contractParams.vaults.length > 0 && (
                <Box sx={sectionBoxStyle}>
                  <Typography variant="subtitle1" gutterBottom>
                    Vaults ({contractParams.vaults.length})
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    {contractParams.vaults.map((v, idx) => (
                      <Card key={idx} variant="outlined" sx={{ minWidth: '100%' }}>
                        <CardContent sx={{ backgroundColor: paperBackgroundColor }}>
                          <Typography fontWeight="bold" variant="body1" gutterBottom>
                            {v.name}
                          </Typography>
                          <Box display="flex" flexDirection="column" gap={1}>
                            <StyledChip label="Vault" href={`${ETHERSCAN_BASE_URL}/address/${v.vault}`} />
                            <StyledChip label="Delegator" href={`${ETHERSCAN_BASE_URL}/address/${v.delegator}`} />
                            <StyledChip label="Slasher" href={`${ETHERSCAN_BASE_URL}/address/${v.slasher}`} />
                            <StyledChip
                              label="Staker Rewards"
                              href={`${ETHERSCAN_BASE_URL}/address/${v.stakerRewards}`}
                            />
                            <StyledChip
                              label="Rewards Impl"
                              href={`${ETHERSCAN_BASE_URL}/address/${v.stakerRewardsImplementation}`}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
