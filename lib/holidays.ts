export type HolidayKind = "newyear" | "valentine" | "religious";

export interface HolidayTheme {
  id: string;
  kind: HolidayKind;
  label: string;
  start: Date;
  end: Date; // dahil (inclusive)
}

function d(y: number, m: number, day: number): Date {
  return new Date(y, m - 1, day);
}

/**
 * Ramazan Bayramı / Kurban Bayramı tarihleri (2026-2030), Diyanet takvimine
 * göre doğrulanmış arefe-bayram aralıklarıdır (kaynak: dini günler takvimi).
 */
const RELIGIOUS_RAW: { id: string; label: string; s: [number, number, number]; e: [number, number, number] }[] = [
  { id: "ramazan-2026", label: "Ramazan Bayramı", s: [2026, 3, 19], e: [2026, 3, 22] },
  { id: "kurban-2026", label: "Kurban Bayramı", s: [2026, 5, 26], e: [2026, 5, 30] },
  { id: "ramazan-2027", label: "Ramazan Bayramı", s: [2027, 3, 8], e: [2027, 3, 11] },
  { id: "kurban-2027", label: "Kurban Bayramı", s: [2027, 5, 15], e: [2027, 5, 19] },
  { id: "ramazan-2028", label: "Ramazan Bayramı", s: [2028, 2, 25], e: [2028, 2, 28] },
  { id: "kurban-2028", label: "Kurban Bayramı", s: [2028, 5, 4], e: [2028, 5, 8] },
  { id: "ramazan-2029", label: "Ramazan Bayramı", s: [2029, 2, 13], e: [2029, 2, 16] },
  { id: "kurban-2029", label: "Kurban Bayramı", s: [2029, 4, 23], e: [2029, 4, 27] },
  { id: "ramazan-2030", label: "Ramazan Bayramı", s: [2030, 2, 3], e: [2030, 2, 6] },
  { id: "kurban-2030", label: "Kurban Bayramı", s: [2030, 4, 12], e: [2030, 4, 16] },
];

const RELIGIOUS_HOLIDAYS: HolidayTheme[] = RELIGIOUS_RAW.map((r) => ({
  id: r.id,
  kind: "religious",
  label: r.label,
  start: d(...r.s),
  end: d(...r.e),
}));

const NEWYEAR_HOLIDAYS: HolidayTheme[] = [2025, 2026, 2027, 2028, 2029, 2030].map((y) => ({
  id: `newyear-${y}`,
  kind: "newyear",
  label: "Yılbaşı Haftası",
  start: d(y, 12, 25),
  end: d(y + 1, 1, 7),
}));

const VALENTINE_HOLIDAYS: HolidayTheme[] = [2026, 2027, 2028, 2029, 2030].map((y) => ({
  id: `valentine-${y}`,
  kind: "valentine",
  label: "Sevgililer Günü Haftası",
  start: d(y, 2, 10),
  end: d(y, 2, 17),
}));

export interface NationalDay {
  month: number; // 1-12
  day: number;
  label: string;
  icon: string;
}

/** Sabit tarihli ulusal bayramlar (her yıl aynı gün) */
export const NATIONAL_FIXED_DAYS: NationalDay[] = [
  { month: 1, day: 1, label: "Yılbaşı", icon: "🎉" },
  { month: 4, day: 23, label: "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı", icon: "🎈" },
  { month: 5, day: 1, label: "1 Mayıs Emek ve Dayanışma Günü", icon: "🌷" },
  { month: 5, day: 19, label: "19 Mayıs Atatürk'ü Anma Gençlik ve Spor Bayramı", icon: "⭐" },
  { month: 7, day: 15, label: "15 Temmuz Demokrasi ve Millî Birlik Günü", icon: "🇹🇷" },
  { month: 8, day: 30, label: "30 Ağustos Zafer Bayramı", icon: "🇹🇷" },
  { month: 10, day: 29, label: "29 Ekim Cumhuriyet Bayramı", icon: "🇹🇷" },
];

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart <= bEnd && bStart <= aEnd;
}

/**
 * Görüntülenen haftaya denk gelen özel tema varsa döndürür.
 * Öncelik sırası: dini bayram > yılbaşı > sevgililer günü
 * (2029 gibi nadir durumlarda Ramazan Bayramı ile Sevgililer Günü Haftası
 * çakışabiliyor; böyle durumda dini bayram teması gösterilir).
 */
export function getActiveHolidayTheme(weekStart: Date, weekEnd: Date): HolidayTheme | null {
  const byPriority: HolidayTheme[][] = [RELIGIOUS_HOLIDAYS, NEWYEAR_HOLIDAYS, VALENTINE_HOLIDAYS];
  for (const group of byPriority) {
    const found = group.find((h) => overlaps(weekStart, weekEnd, h.start, h.end));
    if (found) return found;
  }
  return null;
}

/** Görüntülenen haftadaki günlerden herhangi biri sabit bir ulusal bayrama denk geliyorsa listeler */
export function getNationalDaysInWeek(weekDates: Date[]): { date: Date; day: NationalDay }[] {
  const result: { date: Date; day: NationalDay }[] = [];
  for (const date of weekDates) {
    const match = NATIONAL_FIXED_DAYS.find(
      (n) => n.month === date.getMonth() + 1 && n.day === date.getDate()
    );
    if (match) result.push({ date, day: match });
  }
  return result;
}
