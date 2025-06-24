export const EthereumNetwork = {
  EthereumMainnet: 'Ethereum (Mainnet)',
  EthereumTestnet: 'Ethereum (Testnet)',
};

export type EthereumNetworkType = (typeof EthereumNetwork)[keyof typeof EthereumNetwork];
