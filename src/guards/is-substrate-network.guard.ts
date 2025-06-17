import { SubstrateNetwork, type SubstrateNetworkType } from '../types/substrate-network.type.ts';

export const isSubstrateNetworkGuard = (candidate: string): candidate is SubstrateNetworkType => {
  return Object.values(SubstrateNetwork).includes(candidate as SubstrateNetworkType);
};
