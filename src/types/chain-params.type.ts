import type { ContractParamsType } from './contract-params.type.ts';

export type ChainParamsType = {
  url: string;
  network: string;
  currentClient: string;
  latestClient: string;
  currentRuntime: string;
  latestRuntime: string;
  lastBlock: string;
  clientReleaseUrl: string;
  runtimeReleaseUrl: string;
  contracts?: ContractParamsType;
};
