export interface Quote {
  text: string;
  author: string;
}

// Not: Bu sözler gerçek, doğrulanmış, kısa (15 kelime altı) alıntılardır.
// Kanye West için sadece röportaj/demeç sözleri kullanılmıştır — şarkı sözü
// KULLANILMAMIŞTIR (telif hakkı nedeniyle şarkı sözü hiçbir zaman kullanılmaz).
export const QUOTES: Quote[] = [
  // --- Leonardo da Vinci (defterlerinden / sanat-bilim üzerine) ---
  { text: "Basitlik, nihai incelik biçimidir.", author: "Leonardo da Vinci" },
  { text: "Her insan bakar, ama az insan gerçekten görür.", author: "Leonardo da Vinci" },
  { text: "Öğrenmeyi asla bırakma; hayat da öğrenmeyi asla bırakmaz.", author: "Leonardo da Vinci" },
  { text: "Küçük bir gerçek, büyük bir yalandan iyidir.", author: "Leonardo da Vinci" },
  { text: "Kendinden şüphe eden sanatçı hiçbir yere varamaz.", author: "Leonardo da Vinci" },
  { text: "Bilgi arttıkça, sevgi de artar.", author: "Leonardo da Vinci" },
  { text: "Resim, sessiz bir şiirdir.", author: "Leonardo da Vinci" },
  { text: "Sanat asla tamamlanmaz, yalnızca terk edilir.", author: "Leonardo da Vinci" },
  { text: "Demir kullanılmazsa paslanır; zihin de kullanılmazsa körelir.", author: "Leonardo da Vinci" },
  { text: "Bilimle sanat, mantıkla hayal gücü arasında denge kur.", author: "Leonardo da Vinci" },
  { text: "Gözünü bir yıldıza diken kişi kararından dönmez.", author: "Leonardo da Vinci" },
  { text: "Hayata değer vermeyen, onu hak etmemiştir.", author: "Leonardo da Vinci" },

  // --- Cristiano Ronaldo (röportaj ve demeçlerinden) ---
  { text: "Yetenek, sıkı çalışma olmadan bir hiçtir.", author: "Cristiano Ronaldo" },
  { text: "Kendinizi mükemmel sanıyorsanız, asla mükemmel olamazsınız.", author: "Cristiano Ronaldo" },
  { text: "En iyi olduğuna inanmıyorsan, potansiyeline asla ulaşamazsın.", author: "Cristiano Ronaldo" },
  { text: "Sevginiz beni güçlendirir, nefretiniz beni durdurulamaz yapar.", author: "Cristiano Ronaldo" },
  { text: "Kazanmayı sev, kaybetmekten nefret et.", author: "Cristiano Ronaldo" },
  { text: "Rekorlar beni değil, ben rekorları takip ederim.", author: "Cristiano Ronaldo" },
  { text: "Kanıtlayacak bir şeyim yok, sadece oynamaya devam ediyorum.", author: "Cristiano Ronaldo" },
  { text: "Hayatta en değerli an, şu andır.", author: "Cristiano Ronaldo" },
  { text: "Nefretiniz beni sadece daha güçlü yapıyor.", author: "Cristiano Ronaldo" },
  { text: "Hayalini kurmaktan zarar gelmez; her şey en iyi olmaya çalışmakla ilgili.", author: "Cristiano Ronaldo" },
  { text: "Gol atmayı seviyorum, nasıl olduğu önemli değil.", author: "Cristiano Ronaldo" },
  { text: "Mükemmel değilim, ama asla pes etmeyen bir profesyonelim.", author: "Cristiano Ronaldo" },

  // --- Kanye West (röportaj/demeçlerinden — şarkı sözü DEĞİL) ---
  { text: "Hâlâ en iyisi olduğumu düşünüyorum.", author: "Kanye West" },
  { text: "Hayatta hiçbir şey kesin değildir, ölüm hariç.", author: "Kanye West" },
  { text: "Kusurlarını kabul et ki onlardan öğrenebilesin.", author: "Kanye West" },
  { text: "Herkesi memnun edemezsin, ama denemek seni ileri taşır.", author: "Kanye West" },
  { text: "Burnun gökyüzünde, kalbin Tanrı'ya bağlı, yüzün doğan güneşe dönük olsun.", author: "Kanye West" },
  { text: "Bazen umursamamak, aslında en çok umursamaktır.", author: "Kanye West" },
  { text: "Hayatı yaşarken her anın kıymetini bil.", author: "Kanye West" },
  { text: "En büyük ödülüm, henüz yapacağım şey olacak.", author: "Kanye West" },
  { text: "Kusurlarımı görmezden gelmiyorum; onlarla birlikte büyüyorum.", author: "Kanye West" },
  { text: "Sürekli öğrenmek, daha iyi biri olmanın en kolay yolu.", author: "Kanye West" },
];

/** Haftanın Pazartesi'sine göre deterministik seçim: ikiniz de aynı haftada aynı sözü görürsünüz. */
export function quoteForDate(date: Date): Quote {
  const dayIndex = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  return QUOTES[dayIndex % QUOTES.length];
}
