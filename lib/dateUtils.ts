export const APP_START_DATE = new Date(2026, 7, 1); // 1 Ağustos 2026
export const APP_END_DATE = new Date(2030, 11, 31); // 31 Aralık 2030

const DAY_ABBR = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const TR_MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

export function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function clampDate(d: Date): Date {
  if (d < APP_START_DATE) return new Date(APP_START_DATE);
  if (d > APP_END_DATE) return new Date(APP_END_DATE);
  return d;
}

/** Haftanın Pazartesi gününü döndürür (haftanın ilk günü Pazartesi kabul edilir) */
export function getMonday(date: Date): Date {
  const d = startOfDay(date);
  const day = d.getDay(); // 0=Sun..6=Sat
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

/** Verilen Pazartesi'den başlayarak 7 günlük diziyi döndürür */
export function getWeekDates(monday: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDayLabel(date: Date): string {
  return `${date.getDate()} ${DAY_ABBR[date.getDay()]}`;
}

export function formatWeekRangeLabel(monday: Date): string {
  const sunday = addDays(monday, 6);
  const sameMonth = monday.getMonth() === sunday.getMonth();
  const startLabel = `${monday.getDate()} ${TR_MONTHS[monday.getMonth()]}`;
  const endLabel = sameMonth
    ? `${sunday.getDate()} ${TR_MONTHS[sunday.getMonth()]}`
    : `${sunday.getDate()} ${TR_MONTHS[sunday.getMonth()]}`;
  return `${startLabel} — ${endLabel} ${sunday.getFullYear()}`;
}

export type Season = "summer" | "autumn" | "winter" | "spring";

export function getSeason(date: Date): Season {
  const m = date.getMonth(); // 0-11
  if (m === 11 || m === 0 || m === 1) return "winter";
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  return "autumn";
}

export function isSameDate(a: Date, b: Date): boolean {
  return toISODate(a) === toISODate(b);
}

export function withinAppRange(date: Date): boolean {
  return date >= APP_START_DATE && date <= APP_END_DATE;
}
