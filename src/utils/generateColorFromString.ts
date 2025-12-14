export function generateColorFromString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const r = (hash >> 0) & 255;
  const g = (hash >> 8) & 255;
  const b = (hash >> 16) & 255;

  return `${r}, ${g}, ${b}`;
}
