export function setEndOfDay(date: Date): Date {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59);
  return endOfDay;
}
