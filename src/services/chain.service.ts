import type { ChainParamsType } from '../types/chain-params.type.ts';
import { decodeScaleU64, safePost, timeAgo } from '../utils/utils.ts';
import { GITHUB_API_URL } from '../constants/url.ts';
import { substrateNetworkToEthereumNetworkMapper } from '../mappers/substrate-chain-name.mapper.ts';
import { SubstrateNetwork, type SubstrateNetworkType } from '../types/substrate-network.type.ts';
import { isSubstrateNetworkGuard } from '../guards/is-substrate-network.guard.ts';

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
  } = await fetch(`${GITHUB_API_URL}/repos/moondance-labs/tanssi/releases`, {
    headers: getHeaders('github'),
  })
    .then((r) => (r.ok ? r.json() : []))
    .then((arr: ReleaseItemType[]) => {
      let clientRelease: ReleaseItemType = defaultRelease;
      let runtimeRelease: ReleaseItemType = defaultRelease;

      let latestClient = '';
      let latestRuntime = '';

      if (systemChain.includes('box')) {
        clientRelease = arr.find((item: ReleaseItemType) => /^v.*-para$/.test(item.tag_name)) || defaultRelease;
        runtimeRelease = arr.find((item: ReleaseItemType) => /^runtime.*-para$/.test(item.tag_name)) || defaultRelease;

        latestClient = clientRelease?.tag_name?.slice(1).split('-')[0];
        latestRuntime = runtimeRelease?.tag_name?.replace(/runtime-|-para/g, '');
      }

      if (systemChain.includes('light') || systemChain.includes('Tanssi')) {
        clientRelease = arr.find((item: ReleaseItemType) => /^v(?!.*-para$).*$/.test(item.tag_name)) || defaultRelease;
        runtimeRelease =
          arr.find((item: ReleaseItemType) => /^runtime-.*-starlight$/.test(item.tag_name)) || defaultRelease;

        latestClient = clientRelease?.tag_name?.slice(1).split('-')[0];
        latestRuntime = runtimeRelease?.tag_name?.replace(/runtime-|-starlight/g, '');
      }

      return {
        latestClient,
        latestRuntime,
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

  let substrateNetwork: SubstrateNetworkType = SubstrateNetwork.Unknown; // fallback if we don't detect the substrate network
  const network = `${systemChain} (${specName})`;
  if (isSubstrateNetworkGuard(network)) {
    substrateNetwork = network;
  }

  return {
    substrateNetwork,
    ethereumNetwork: substrateNetworkToEthereumNetworkMapper(substrateNetwork),
    currentClient: systemVersion,
    latestClient: latestReleases.latestClient,
    currentRuntime: String(runtimeVersion.result.specVersion),
    latestRuntime: latestReleases.latestRuntime,
    lastBlock: timeAgo(Number(decodeScaleU64(lastBlock))),
    clientReleaseUrl: latestReleases.clientReleaseUrl,
    runtimeReleaseUrl: latestReleases.runtimeReleaseUrl,
    url,
  };
};
