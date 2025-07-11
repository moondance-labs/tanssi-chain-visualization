import { useState } from 'react';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { BN } from '@polkadot/util';
import { Buffer } from 'buffer';

type MetaErrorResultType = { method: string; section: string; name: string; docs: string };

export const useErrorChecker = () => {
  const [moduleIndex, setModuleIndex] = useState('');
  const [errorIndex, setErrorIndex] = useState('');
  const [result, setResult] = useState<MetaErrorResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [networkUrl, setNetworkUrl] = useState('');

  const handleCheckError = async () => {
    setLoading(true);
    setResult(null);
    setError('');

    try {
      if (!networkUrl) throw new Error('Invalid endpoint');

      const provider = new WsProvider(networkUrl);
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
    moduleIndex,
    errorIndex,
    result,
    loading,
    error,
    setModuleIndex,
    setErrorIndex,
    setNetworkUrl,
    networkUrl,
  };
};
