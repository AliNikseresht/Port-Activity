export function formatDateTime(date: Date): string {
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getDayShort(date: Date): string {
  return date.toLocaleDateString(undefined, { weekday: "short" });
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function formatDuration(durationHours: number): string {
  const totalMinutes = Math.round(durationHours * 60);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  return `${days.toString().padStart(2, "0")}d ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}


