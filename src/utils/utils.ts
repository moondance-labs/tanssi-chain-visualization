export const timeAgo = (ms: number): string => {
  const diff = Date.now() - ms;
  if (diff < 0) return 'Just now';
  const s = Math.floor(diff / 1000),
    m = Math.floor(s / 60),
    h = Math.floor(m / 60),
    d = Math.floor(h / 24);

  const parts: string[] = [];
  if (d) parts.push(`${d} day${d > 1 ? 's' : ''}`);
  if (h % 24) parts.push(`${h % 24} hour${h % 24 > 1 ? 's' : ''}`);
  if (m % 60) parts.push(`${m % 60} minute${m % 60 > 1 ? 's' : ''}`);
  if (s % 60 || parts.length === 0) parts.push(`${s % 60} second${s % 60 > 1 ? 's' : ''}`);
  return parts.join(', ') + ' ago';
};

export const safePost = async (url: string, body: BodyInit) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const decodeScaleU64 = (hex: string): bigint => {
  if (hex.startsWith('0x')) hex = hex.slice(2);
  if (hex.length !== 16) throw new Error('Invalid SCALE-encoded u64');
  const reversed = hex.match(/.{2}/g)?.reverse().join('');

  return BigInt('0x' + reversed);
};
