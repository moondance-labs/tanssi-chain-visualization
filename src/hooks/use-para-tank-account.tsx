import { useState } from 'react';
import { bnToU8a, stringToU8a } from '@polkadot/util';
import copy from 'copy-to-clipboard';
import { blake2AsU8a, encodeAddress } from '@polkadot/util-crypto';

type ParaTankResultType = { address: string };

export const useParaTankAccount = () => {
  const [paraId, setParaId] = useState('');
  const [result, setResult] = useState<ParaTankResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result?.address) {
      const success = copy(result.address);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }
    }
  };

  const handleCheckError = async () => {
    setLoading(true);
    setResult(null);
    setError('');

    try {
      const seedBytes = stringToU8a('modlpy/serpayment');
      const paraIdBytes = bnToU8a(Number(paraId), { bitLength: 32 });
      const combinedBytes = new Uint8Array(seedBytes.length + paraIdBytes.length);
      combinedBytes.set(seedBytes);
      combinedBytes.set(paraIdBytes, seedBytes.length);
      const addressBytes = blake2AsU8a(combinedBytes, 256);
      const address = encodeAddress(addressBytes);

      setResult({ address: address });
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
    result,
    loading,
    error,
    paraId,
    setParaId,
    copied,
    handleCopy,
  };
};
