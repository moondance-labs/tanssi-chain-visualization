import type { ContractParamsType } from '../types/contract-params.type.ts';
import { GITHUB_CONTENT_URL } from '../constants/url.ts';

export const fetchContractsData = async (contractFile: string): Promise<ContractParamsType | undefined> => {
  const baseUrl = `${GITHUB_CONTENT_URL}/moondance-labs/tanssi-symbiotic/main/contract-addresses`;

  try {
    const response = await fetch(`${baseUrl}/${contractFile}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${contractFile}: ${response.statusText}`);
    }

    const json = await response.json();
    return parseContracts(json);
  } catch (error) {
    console.error(`Error fetching ${contractFile}:`, error);
  }
};

const parseContracts = (data: any): ContractParamsType => {
  const result: ContractParamsType = { contracts: [], collaterals: [], vaults: [] };

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      result.contracts.push({ name: key, address: value });
    }
  }

  if (Array.isArray(data.collaterals)) {
    for (const { name, address, oracle } of data.collaterals) {
      result.collaterals.push({ name, address, oracle });
    }
  }

  if (Array.isArray(data.vaults)) {
    for (const { name, vault, delegator, slasher, stakerRewards, stakerRewardsImplementation } of data.vaults) {
      result.vaults.push({ name, vault, delegator, slasher, stakerRewards, stakerRewardsImplementation });
    }
  }

  return result;
};
