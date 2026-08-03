// Not: Merkür retrosu tarihleri gerçek astronomik verilerden alınmıştır
// (Mercury'nin Dünya'dan bakıldığında geri gidiyormuş gibi göründüğü
// dönemler). Haftalık "enerji" metinleri ise eğlence amaçlı, sabit bir
// havuzdan haftaya göre dönüşümlü seçilir — gerçek zamanlı astrolojik
// hesaplama değildir.

function d(y: number, m: number, day: number): Date {
  return new Date(y, m - 1, day);
}

export interface RetroWindow {
  start: Date;
  end: Date;
}

export const MERCURY_RETROGRADE_WINDOWS: RetroWindow[] = [
  { start: d(2026, 2, 26), end: d(2026, 3, 20) },
  { start: d(2026, 6, 29), end: d(2026, 7, 23) },
  { start: d(2026, 10, 24), end: d(2026, 11, 13) },
  { start: d(2027, 2, 9), end: d(2027, 3, 3) },
  { start: d(2027, 6, 10), end: d(2027, 7, 4) },
  { start: d(2027, 10, 7), end: d(2027, 10, 28) },
  { start: d(2028, 1, 24), end: d(2028, 2, 14) },
  { start: d(2028, 5, 21), end: d(2028, 6, 13) },
  { start: d(2028, 9, 19), end: d(2028, 10, 11) },
  { start: d(2029, 1, 7), end: d(2029, 1, 27) },
  { start: d(2029, 5, 1), end: d(2029, 5, 25) },
  { start: d(2029, 9, 2), end: d(2029, 9, 24) },
  { start: d(2029, 12, 22), end: d(2030, 1, 11) },
  { start: d(2030, 4, 12), end: d(2030, 5, 6) },
  { start: d(2030, 8, 15), end: d(2030, 9, 8) },
  { start: d(2030, 12, 5), end: d(2030, 12, 25) },
];

export function isMercuryRetrograde(weekStart: Date, weekEnd: Date): boolean {
  return MERCURY_RETROGRADE_WINDOWS.some(
    (w) => weekStart <= w.end && w.start <= weekEnd
  );
}

export interface WeeklyEnergy {
  title: string;
  text: string;
}

// Yay Güneş + Kova Yükselen temalı, dönüşümlü haftalık "enerji" havuzu
export const WEEKLY_ENERGY_POOL: WeeklyEnergy[] = [
  { title: "Macera Rüzgarı", text: "Yay enerjisi bu hafta sizi rutinin dışına çıkmaya çağırıyor; küçük bir kaçamak ikinize de iyi gelebilir." },
  { title: "Özgür Ruh", text: "Kova yükseleniniz bağımsızlığa değer verir; birbirinize alan tanımak bu hafta ilişkinizi güçlendirebilir." },
  { title: "Sözün Gücü", text: "İletişim öne çıkıyor — aklınızdakini açıkça söylemek, içinize atmaktan daha iyi sonuç verecek." },
  { title: "Ufuk Açan Sohbetler", text: "Yay'ın meraklı yapısı bu hafta yeni bir konuda birlikte bir şeyler öğrenmenizi işaret ediyor." },
  { title: "Sıcak ve Samimi", text: "Küçük, içten bir jest bu hafta beklenenden daha çok anlam kazanabilir." },
  { title: "Yenilikçi Bakış", text: "Kova'nın özgün fikirleri bu hafta planlarınıza sıradışı bir dokunuş katabilir." },
  { title: "Sabır Zamanı", text: "Bu hafta biraz daha sabırlı olmak, küçük anlaşmazlıkların büyümesini engelleyebilir." },
  { title: "Birlikte Kutlama", text: "Küçük bir başarıyı bile kutlamak bu hafta ilişkinize güzel bir enerji katacak." },
  { title: "İçe Dönüş", text: "Dışa dönük Yay enerjisine rağmen, bu hafta biraz yavaşlayıp ikiniz için zaman ayırmak iyi gelebilir." },
  { title: "Dürüst Konuşma", text: "Yay'ın dürüstlüğü bu hafta öne çıkıyor; nazik ama açık bir konuşma aranızı rahatlatabilir." },
  { title: "Planlar Netleşiyor", text: "Ufuktaki bir plan bu hafta somutlaşabilir; birlikte küçük bir hedef belirlemek keyifli olabilir." },
  { title: "Kendine Alan Aç", text: "Kova enerjisiyle bu hafta kendi ilgi alanlarınıza da zaman ayırmak ilişkinizi dengeler." },
];

export function weeklyEnergyFor(weekStart: Date): WeeklyEnergy {
  const weekIndex = Math.floor(weekStart.getTime() / (1000 * 60 * 60 * 24 * 7));
  const i = ((weekIndex % WEEKLY_ENERGY_POOL.length) + WEEKLY_ENERGY_POOL.length) % WEEKLY_ENERGY_POOL.length;
  return WEEKLY_ENERGY_POOL[i];
}
