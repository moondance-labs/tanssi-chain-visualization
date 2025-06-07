export const chainUrlToContractFileMapper = (network: string): string => {
  const table = {
    'Stagelight (dancelight)': 'stagelight.json',
    'Dancelight (dancelight)': 'dancelight.json',
    'Moonlight (starlight)': 'moonlight.json',
    'Tanssi (starlight)': 'tanssi.json',
  } as const;

  type NetworkName = keyof typeof table;

  return table.hasOwnProperty(network) ? table[network as NetworkName] : '';
};
