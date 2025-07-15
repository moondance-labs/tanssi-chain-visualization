import type { ChainParamsType } from '../types/chain-params.type.ts';
import { useEffect, useState } from 'react';
import { fetchChainData } from '../services/chain.service.ts';
import { fetchContractsData } from '../services/contracts.service.ts';
import {
  substrateNetworkToContractFileMapper,
  substrateNetworkToEthereumNetworkMapper,
  substrateRpcUrlToSubstrateNetworkMapper,
} from '../mappers/substrate-chain-name.mapper.ts';

export const useChains = (
  urls: string[],
): { chainParams: ChainParamsType[]; isLoading: boolean; error: string; fetchData: () => void } => {
  const [chainParams, setChainParams] = useState<ChainParamsType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    setChainParams(
      urls.map((url) => {
        const substrateNetwork = substrateRpcUrlToSubstrateNetworkMapper(url);
        return {
          url,
          substrateNetwork,
          ethereumNetwork: substrateNetworkToEthereumNetworkMapper(substrateNetwork),
          currentClient: '',
          latestClient: '',
          currentRuntime: '',
          latestRuntime: '',
          lastBlock: '',
          clientReleaseUrl: '',
          runtimeReleaseUrl: '',
        };
      }),
    );

    try {
      const promises = [];
      for (const url of urls) {
        promises.push(fetchChainData(url));
      }
      let data = await Promise.all(promises);
      data = await augmentWithContractData(data);
      setChainParams(data);
    } catch (e) {
      console.error(e);
      setError('Something went wrong, check logs.');
    } finally {
      setLoading(false);
    }
  };

  return { chainParams, isLoading, error, fetchData };
};

const augmentWithContractData = (data: ChainParamsType[]): Promise<ChainParamsType[]> => {
  return Promise.all(
    data.map(async (chain) => {
      const contractFile = substrateNetworkToContractFileMapper(chain.substrateNetwork!);
      if (contractFile) {
        chain.contracts = await fetchContractsData(contractFile);
      }

      return chain;
    }),
  );
};
