export const SubstrateNetwork = {
  DanceboxStage: 'Dancebox Stage (dancebox)',
  Flashbox: 'Flashbox (flashbox)',
  Dancebox: 'Dancebox (dancebox)',
  Stagelight: 'Stagelight (dancelight)',
  Dancelight: 'Dancelight (dancelight)',
  Moonlight: 'Moonlight (starlight)',
  Tanssi: 'Tanssi (starlight)',
  Unknown: 'Unknown (unknown)',
} as const;

export type SubstrateNetworkType = (typeof SubstrateNetwork)[keyof typeof SubstrateNetwork];
