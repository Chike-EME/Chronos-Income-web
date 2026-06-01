export function formatHours(hours: number): string {
  const totalSeconds = Math.round(hours * 3600);

  const hh = Math.floor(totalSeconds / 3600);
  const mm = Math.floor((totalSeconds % 3600) / 60);
  const ss = totalSeconds % 60;

  return [hh, mm, ss].map(value => String(value).padStart(2, '0')).join(':');
}
