export type ContractParamsType = {
  contracts: { name: string; address: string }[];
  collaterals: { name: string; address: string; oracle: string }[];
  vaults: {
    name: string;
    vault: string;
    delegator: string;
    slasher: string;
    stakerRewards: string;
    stakerRewardsImplementation: string;
  }[];
};
