export const EthereumNetwork = {
  EthereumMainnet: 'Ethereum (Mainnet)',
  EthereumTestnet: 'Ethereum (Testnet)',
} as const;

export type EthereumNetworkType = (typeof EthereumNetwork)[keyof typeof EthereumNetwork];
