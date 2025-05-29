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

type ReleaseItemType = { tag_name: string; name: string; html_url: string };
const defaultRelease = { tag_name: '', name: '', html_url: '' } as ReleaseItemType;

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

  const latestReleases: {
    latestClient: string;
    latestRuntime: string;
    clientReleaseUrl: string;
    runtimeReleaseUrl: string;
  } = await fetch('https://api.github.com/repos/moondance-labs/tanssi/releases', {
    headers: getHeaders('github'),
  })
    .then((r) => (r.ok ? r.json() : []))
    .then((arr: ReleaseItemType[]) => {
      let clientRelease: ReleaseItemType = defaultRelease;
      let runtimeRelease: ReleaseItemType = defaultRelease;

      if (systemChain.includes('box')) {
        clientRelease = arr.find((item: ReleaseItemType) => item.name.includes('Tanssi-para')) || defaultRelease;
        runtimeRelease = arr.find((item: ReleaseItemType) => item.tag_name.endsWith('-para')) || defaultRelease;
      }

      if (systemChain.includes('light') || systemChain.includes('Tanssi')) {
        clientRelease = arr.find((item: ReleaseItemType) => item.name.includes('Tanssi-relay')) || defaultRelease;
        runtimeRelease = arr.find((item: ReleaseItemType) => item.tag_name.endsWith('-starlight')) || defaultRelease;
      }

      return {
        latestClient: clientRelease?.tag_name?.slice(1).split('-')[0],
        latestRuntime: runtimeRelease?.tag_name?.replace(/runtime-|-para|-starlight/g, ''),
        clientReleaseUrl: clientRelease.html_url,
        runtimeReleaseUrl: runtimeRelease.html_url,
      };
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
    latestClient: latestReleases.latestClient,
    currentRuntime: String(runtimeVersion.result.specVersion),
    latestRuntime: latestReleases.latestRuntime,
    lastBlock: timeAgo(Number(decodeScaleU64(lastBlock))),
    clientReleaseUrl: latestReleases.clientReleaseUrl,
    runtimeReleaseUrl: latestReleases.runtimeReleaseUrl,
  };
};
