import { useState } from 'react';
import { parachainUrls, relaychainUrls } from '../constants/url.ts';

const CUSTOM_NAME = 'Custom';

export const useNetworkSelector = (onChange: (url: string) => void) => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  const onUrlChange = (url: string) => {
    setSelectedNetwork(url);
    if (url === CUSTOM_NAME) {
      onChange('');
    } else {
      onChange(url);
    }
  };

  const onCustomUrlChange = (url: string) => {
    setCustomUrl(url);
    onChange(url);
  };

  const networks = [...parachainUrls, ...relaychainUrls].map((url) => {
    let urlReplaced = url.replace('https://', 'wss://');
    return { name: urlReplaced, url: urlReplaced };
  });
  networks.push({ name: CUSTOM_NAME, url: '' });

  return { networks, selectedNetwork, setSelectedNetwork, setCustomUrl, customUrl, onUrlChange, onCustomUrlChange };
};
