import { EthereumNetwork, type EthereumNetworkType } from '../types/ethereum-network.type.ts';
import { ETHERSCAN_MAINNET_BASE_URL, ETHERSCAN_TESTNET_BASE_URL } from '../constants/url.ts';
import { SubstrateNetwork, type SubstrateNetworkType } from '../types/substrate-network.type.ts';

export const substrateNetworkToContractFileMapper = (network: SubstrateNetworkType): string => {
  const table: Record<string, string> = {
    [SubstrateNetwork.Stagelight]: 'stagelight.json',
    [SubstrateNetwork.Dancelight]: 'dancelight.json',
    [SubstrateNetwork.Moonlight]: 'moonlight.json',
    [SubstrateNetwork.Tanssi]: 'tanssi.json',
  };

  return table[network] || '';
};

export const substrateNetworkToEthereumNetworkMapper = (network: SubstrateNetworkType): EthereumNetworkType => {
  const table: Record<string, EthereumNetworkType> = {
    [SubstrateNetwork.Stagelight]: EthereumNetwork.EthereumTestnet,
    [SubstrateNetwork.Dancelight]: EthereumNetwork.EthereumTestnet,
    [SubstrateNetwork.Moonlight]: EthereumNetwork.EthereumMainnet,
    [SubstrateNetwork.Tanssi]: EthereumNetwork.EthereumMainnet,
  };

  return table[network] || EthereumNetwork.EthereumTestnet;
};

export const ethNetworkToExplorerUrlMapper = (network: EthereumNetworkType) => {
  const table: Record<EthereumNetworkType, string> = {
    [EthereumNetwork.EthereumMainnet]: ETHERSCAN_MAINNET_BASE_URL,
    [EthereumNetwork.EthereumTestnet]: ETHERSCAN_TESTNET_BASE_URL,
  };

  return table[network] || ETHERSCAN_TESTNET_BASE_URL;
};

export const substrateNetworkToSubscanUrl = (network: SubstrateNetworkType): string => {
  const table: Record<string, string> = {
    [SubstrateNetwork.Tanssi]: 'https://tanssi.subscan.io',
    [SubstrateNetwork.Dancelight]: 'https://dancelight.subscan.io',
  };

  return table[network] || '';
};

export const substrateRpcUrlToSubstrateNetworkMapper = (url: string): SubstrateNetworkType => {
  const table: Record<EthereumNetworkType, string> = {
    'https://services.tanssi-dev.network/stagebox': SubstrateNetwork.DanceboxStage,
    'https://fraa-flashbox-rpc.a.stagenet.tanssi.network': SubstrateNetwork.Flashbox,
    'https://services.tanssi-dev.network/stagelight': SubstrateNetwork.Stagelight,
    'https://services.tanssi-testnet.network/dancelight': SubstrateNetwork.Dancelight,
    'https://services.tanssi-dev.network/moonlight': SubstrateNetwork.Moonlight,
    'https://services.tanssi-mainnet.network/tanssi': SubstrateNetwork.Tanssi,
  };

  return table[url] || '';
};
