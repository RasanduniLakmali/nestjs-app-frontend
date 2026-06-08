export function decodeJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getExpiryInfo(token) {
  const payload = decodeJwt(token);
  if (!payload?.exp) return null;
  const now = Date.now() / 1000;
  const total = payload.exp - (payload.iat || (payload.exp - 3600));
  const remaining = payload.exp - now;
  const pct = Math.max(0, Math.min(100, (remaining / total) * 100));
  const mins = Math.max(0, Math.round(remaining / 60));
  return { mins, pct, expired: remaining <= 0 };
}

export function passwordStrength(pwd) {
  if (!pwd) return { level: 0, label: '', cls: '' };
  if (pwd.length < 6)  return { level: 1, label: 'weak',   cls: 'weak' };
  if (pwd.length < 10) return { level: 2, label: 'fair',   cls: 'fair' };
  return               { level: 3, label: 'strong', cls: 'strong' };
}
