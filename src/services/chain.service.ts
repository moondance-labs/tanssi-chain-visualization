import type { ChainParamsType } from '../types/chain-params.type.ts';
import { decodeScaleU64, safePost, timeAgo } from '../utils/utils.ts';

if (!import.meta.env.VITE_GH_PARTS_JSON) {
  throw new Error('VITE_GH_PARTS_JSON is not defined');
}
const ghParts = JSON.parse(import.meta.env.VITE_GH_PARTS_JSON);
const getHeaders = (target: string, extra = {}): HeadersInit => {
  const headers: HeadersInit = { ...extra };
  if (target === 'github') {
    headers['Authorization'] = `Bearer ${ghParts.map(atob).join('_')}`;
  }
  return headers;
};

type ItemType = { tag_name: string; name: string };

export const fetchChainData = async (url: string): Promise<ChainParamsType> => {
  const runtimeVersion = await safePost(
    url,
    JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'state_getRuntimeVersion',
      params: [],
    }),
  );
  const specName = runtimeVersion.result.specName;

  const systemChain = await safePost(
    url,
    JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'system_chain',
    }),
  ).then((res) => res?.result);
  const systemVersion = await safePost(
    url,
    JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'system_version',
    }),
  ).then((res) => res?.result?.split('-')[0]);

  const latestReleases = await fetch('https://api.github.com/repos/moondance-labs/tanssi/releases', {
    headers: getHeaders('github'),
  })
    .then((r) => (r.ok ? r.json() : []))
    .then((arr) => {
      let client;
      let runtime;

      if (systemChain.includes('box')) {
        client = arr.find((item: ItemType) => item.name.includes('Tanssi-para'));
        runtime = arr.find((item: ItemType) => item.tag_name.endsWith('-para'));
      }

      if (systemChain.includes('light')) {
        client = arr.find((item: ItemType) => item.name.includes('Tanssi-relay'));
        runtime = arr.find((item: ItemType) => item.tag_name.endsWith('-starlight'));
      }

      return [client?.tag_name?.slice(1).split('-')[0], runtime?.tag_name?.replace(/runtime-|-para|-starlight/g, '')];
    });

  const lastBlock = await safePost(
    url,
    JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'state_getStorage',
      params: ['0xf0c365c3cf59d671eb72da0e7a4113c49f1f0515f462cdcf84e0f1d6045dfcbb'],
    }),
  ).then((res) => res?.result);

  return {
    network: `${systemChain} (${specName})`,
    currentClient: systemVersion,
    latestClient: latestReleases[0],
    currentRuntime: String(runtimeVersion.result.specVersion),
    latestRuntime: latestReleases[1],
    lastBlock: timeAgo(Number(decodeScaleU64(lastBlock))),
  };
};
