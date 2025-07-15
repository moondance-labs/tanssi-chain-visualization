import type { ContractParamsType } from './contract-params.type.ts';
import type { EthereumNetworkType } from './ethereum-network.type.ts';
import type { SubstrateNetworkType } from './substrate-network.type.ts';

export type ChainParamsType = {
  url: string;
  substrateNetwork: SubstrateNetworkType;
  ethereumNetwork?: EthereumNetworkType;
  currentClient?: string;
  latestClient?: string;
  currentRuntime?: string;
  latestRuntime?: string;
  lastBlock?: string;
  clientReleaseUrl?: string;
  runtimeReleaseUrl?: string;
  contracts?: ContractParamsType;
};
