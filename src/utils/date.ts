export function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTodayString(): string {
  return toLocalDateString(new Date());
}

export function getMonthDays(year: number, month: number) {
  const days = [];
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);
    days.push({
      day: String(day).padStart(2, '0'),
      weekDay: date.toLocaleDateString('pt-BR', { weekday: 'long' }),
      fullDate: toLocalDateString(date),
    });
  }

  return days;
}
