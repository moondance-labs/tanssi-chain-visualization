import { useState } from 'react';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { BN } from '@polkadot/util';
import { Buffer } from 'buffer';
import { parachainUrls, relaychainUrls } from '../constants/url.ts';

type MetaErrorResultType = { method: string; section: string; name: string; docs: string };

export const useErrorChecker = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [moduleIndex, setModuleIndex] = useState('');
  const [errorIndex, setErrorIndex] = useState('');
  const [result, setResult] = useState<MetaErrorResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const networks = [...parachainUrls, ...relaychainUrls].map((url) => {
    let urlReplaced = url.replace('https://', 'wss://');
    return { name: urlReplaced, url: urlReplaced };
  });
  networks.push({ name: 'Custom', url: '' });

  const handleCheckError = async () => {
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const network = networks.find((n) => n.name === selectedNetwork);
      const endpoint = selectedNetwork === 'Custom' ? customUrl : network?.url;

      if (!endpoint) throw new Error('Invalid endpoint');

      const provider = new WsProvider(endpoint);
      const api = await ApiPromise.create({ provider });

      const errorBytes = Uint8Array.from(Buffer.from(errorIndex.slice(2), 'hex'));
      const errorIndexBytes = errorBytes[0];

      const { section, method, name, docs } = api.registry.findMetaError({
        index: new BN(moduleIndex),
        error: new BN(errorIndexBytes),
      });

      setResult({ section, method, name, docs: docs.join(', ') });

      await api.disconnect();
    } catch (err: unknown) {
      let errorObj = err as Error;
      console.error('Full error: ', errorObj);
      setError(`Error: ${errorObj.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCheckError,
    selectedNetwork,
    customUrl,
    moduleIndex,
    errorIndex,
    result,
    loading,
    error,
    setSelectedNetwork,
    setCustomUrl,
    setModuleIndex,
    setErrorIndex,
    networks,
  };
};
