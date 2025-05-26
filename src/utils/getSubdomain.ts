export function getSubdomain() {
  const host = window.location.hostname;
  if (host.endsWith('neko24.de')) {
    const parts = host.split('.');
    if (parts.length === 3) {
      return parts[0]; // z.B. "hansmakler"
    }
  }
  return null;
}
