export const SubstrateNetwork = {
  DanceboxStage: 'Dancebox Stage (dancebox)',
  Flashbox: 'Flashbox (flashbox)',
  Stagelight: 'Stagelight (dancelight)',
  Dancelight: 'Dancelight (dancelight)',
  Moonlight: 'Moonlight (starlight)',
  Tanssi: 'Tanssi (starlight)',
};

export type SubstrateNetworkType = (typeof SubstrateNetwork)[keyof typeof SubstrateNetwork];
