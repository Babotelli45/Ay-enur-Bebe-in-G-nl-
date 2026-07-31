export interface Quote {
  text: string;
  author: string;
}

// Not: Kısa, doğru şekilde atfedilmiş, tek satırlık sözler.
export const QUOTES: Quote[] = [
  { text: "Basitlik, nihai incelik biçimidir.", author: "Leonardo da Vinci" },
  {
    text: "Bir şeye duyduğun sevgi, korkundan büyük olmalı.",
    author: "Cristiano Ronaldo",
  },
  { text: "Hâlâ en iyisi olduğumu düşünüyorum.", author: "Kanye West" },
  {
    text: "Öğrenmeyi asla bırakma; hayat öğrenmeyi asla bırakmaz.",
    author: "Leonardo da Vinci",
  },
  {
    text: "Zafer, çok çalışıp hazır olduğunda gelir.",
    author: "Cristiano Ronaldo",
  },
];

export function quoteForDate(date: Date): Quote {
  const dayIndex = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  return QUOTES[dayIndex % QUOTES.length];
}
