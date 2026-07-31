export type ActivityCategoryId =
  | "yuruyus"
  | "yemek"
  | "kahve"
  | "etkinlik"
  | "pembe";

export interface ActivityCategory {
  id: ActivityCategoryId;
  label: string;
  emoji: string;
  bg: string; // tailwind gradient classes for the "buğulu" backdrop
  options: string[];
  allowCustom: boolean;
}

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  {
    id: "yuruyus",
    label: "Yürüyüş",
    emoji: "🌳",
    bg: "from-emerald-100 to-emerald-200",
    options: ["Deniz kenarı", "Orman", "Park"],
    allowCustom: true,
  },
  {
    id: "yemek",
    label: "Yemek",
    emoji: "🍴",
    bg: "from-orange-100 to-rose-100",
    options: ["Fastfood", "Diyet", "Sushi", "Tatlı"],
    allowCustom: true,
  },
  {
    id: "kahve",
    label: "Kahve",
    emoji: "☕",
    bg: "from-amber-100 to-amber-200",
    options: ["Casual", "Kokteyl"],
    allowCustom: true,
  },
  {
    id: "etkinlik",
    label: "Etkinlik",
    emoji: "🎬",
    bg: "from-violet-100 to-indigo-100",
    options: ["Sinema / Tiyatro", "Arcade", "Bowling"],
    allowCustom: true,
  },
  {
    id: "pembe",
    label: "Pembe Özel Tuş",
    emoji: "✨",
    bg: "from-pink-200 to-fuchsia-200",
    options: ["Rastgele Seçim", "YES KİNG (( farkmaz ))"],
    allowCustom: false,
  },
];

/** Pembe tuş > Rastgele Seçim: Kahve ve Yürüyüş ağırlıklı rastgele seçim */
export function weightedRandomActivity(): { main: string; sub: string } {
  const pool: { main: string; sub: string; weight: number }[] = [
    { main: "Kahve", sub: "Casual", weight: 3 },
    { main: "Kahve", sub: "Kokteyl", weight: 2 },
    { main: "Yürüyüş", sub: "Deniz kenarı", weight: 3 },
    { main: "Yürüyüş", sub: "Park", weight: 2 },
    { main: "Yürüyüş", sub: "Orman", weight: 2 },
    { main: "Yemek", sub: "Sushi", weight: 1 },
    { main: "Yemek", sub: "Tatlı", weight: 1 },
    { main: "Etkinlik", sub: "Sinema / Tiyatro", weight: 1 },
  ];
  const total = pool.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * total;
  for (const p of pool) {
    if (r < p.weight) return { main: p.main, sub: p.sub };
    r -= p.weight;
  }
  return { main: "Kahve", sub: "Casual" };
}
