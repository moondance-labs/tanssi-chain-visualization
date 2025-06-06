import { Box, Collapse, Link, TableCell, TableRow, Typography } from '@mui/material';
import type { ContractParamsType } from '../types/contract-params.type.ts';

export const CollapsibleRow = ({ contractParams, isOpen }: { contractParams: ContractParamsType; isOpen: boolean }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box sx={{ margin: 1, maxHeight: '200px', overflowY: 'auto' }}>
              <Typography variant="subtitle2" gutterBottom>
                Contracts:
              </Typography>
              <Box>
                {contractParams.contracts.map((contract, index) => (
                  <Box key={index}>
                    <Link href={`https://etherscan.io/address/${contract.address}`} target="_blank">
                      {contract.name}
                    </Link>
                  </Box>
                )) || <Typography color="textSecondary">No data</Typography>}
              </Box>
            </Box>
            {contractParams.collaterals.length > 0 && (
              <Box sx={{ margin: 1, maxHeight: '200px', overflowY: 'auto' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Collaterals:
                </Typography>
                <Box>
                  {contractParams.collaterals.map((contract, index) => (
                    <Box key={index}>
                      <Link href={`https://etherscan.io/address/${contract.address}`} target="_blank">
                        {contract.name}
                      </Link>
                      <Link href={`https://etherscan.io/address/${contract.oracle}`} target="_blank">
                        Oracle
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {contractParams.vaults.length > 0 && (
              <Box sx={{ margin: 1, maxHeight: '200px', overflowY: 'auto' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Vaults:
                </Typography>
                <Box>
                  {contractParams.vaults.map((contract, index) => (
                    <Box>
                      <Box key={index}>
                        <Link href={`https://etherscan.io/address/${contract.vault}`} target="_blank">
                          {contract.name}
                        </Link>
                      </Box>
                      <Box key={index}>
                        <Link href={`https://etherscan.io/address/${contract.delegator}`} target="_blank">
                          Delegator
                        </Link>
                      </Box>
                      <Box key={index}>
                        <Link href={`https://etherscan.io/address/${contract.slasher}`} target="_blank">
                          Slasher
                        </Link>
                      </Box>
                      <Box key={index}>
                        <Link href={`https://etherscan.io/address/${contract.stakerRewards}`} target="_blank">
                          Staker Rewards
                        </Link>
                      </Box>
                      <Box key={index}>
                        <Link
                          href={`https://etherscan.io/address/${contract.stakerRewardsImplementation}`}
                          target="_blank"
                        >
                          Staker Rewards Implementation
                        </Link>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
