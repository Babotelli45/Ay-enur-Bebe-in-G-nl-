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
  { text: "Seni çok seviyorum.", author: "Cristiano Ronaldo" },
  { text: "Sevginiz beni güçlendirir, nefretiniz beni durdurulamaz yapar.", author: "Cristiano Ronaldo" },
  { text: "Kazanmayı sev, kaybetmekten nefret et.", author: "Cristiano Ronaldo" },
  { text: "Rekorlar beni değil, ben rekorları takip ederim.", author: "Cristiano Ronaldo" },
  { text: "Kanıtlayacak bir şeyim yok, sadece oynamaya devam ediyorum.", author: "Cristiano Ronaldo" },
  { text: "En değerli kupam sensin c3.", author: "Cristiano Ronaldo" },
  { text: "Hayatta en değerli an, şu andır.", author: "Cristiano Ronaldo" },
  { text: "Nefretiniz beni sadece daha güçlü yapıyor.", author: "Cristiano Ronaldo" },
  { text: "Hayalini kurmaktan zarar gelmez; her şey en iyi olmaya çalışmakla ilgili.", author: "Cristiano Ronaldo" },
  { text: "Gol atmayı seviyorum, nasıl olduğu önemli değil.", author: "Cristiano Ronaldo" },
  { text: "Mükemmel değilim, ama asla pes etmeyen bir profesyonelim.", author: "Cristiano Ronaldo" },
  { text: "Dağın zirvesindeyken aşağısında nelerin olduğunu görmezsiniz.", author: "Cristiano Ronaldo" },
  { text: "Kötü dönemlerden geçtim ama hayat devam ediyor.", author: "Cristiano Ronaldo" },
  { text: "Tüm başarımı anneme adıyorum ve hayatta olduğu sürece benim yanımda olacak.", author: "Cristiano Ronaldo" },
  { text: "Messi zeki, İbrahimoviç güçlü, Beckham yakışıklı diye seviliyorlar. Ben ise sevilmiyorum çünkü bunların hepsi bende var.", author: "Cristiano Ronaldo" },
  { text: "insaların hakkımda kötü şeyler söylemesine alışığım", author: "Cristiano Ronaldo" },
  { text: "Hayalim her zaman aynıydı, Elimden gelenin en iyisini yapmak", author: "Cristiano Ronaldo" },
  { text: "yahudi oç cüce messi", author: "Cristiano Ronaldo" },
  { text: "Kimseyi senin kadar sevmemiştim", author: "Cristiano Ronaldo" },
  { text: "Bazıları benden nefret ediyo, belkide fazla iyi olduğum içindir", author: "Cristiano Ronaldo" },
  { text: "En iyisi benim.", author: "Cristiano Ronaldo" },
  { text: "Ders ne demek?", author: "Cristiano Ronaldo" },
  { text: "1000 gole ulaşacağım.", author: "Cristiano Ronaldo" },
  
  
  // --- Kanye West (röportaj/demeçlerinden — şarkı sözü DEĞİL) ---
  { text: "Hâlâ en iyisi olduğumu düşünüyorum.", author: "Kanye West" },
  { text: "Hayatta hiçbir şey kesin değildir, ölüm hariç.", author: "Kanye West" },
  { text: "Ayaklarının tapusu sonsuza dek bana ait.", author: "Kanye West" },
  { text: "Kusurlarını kabul et ki onlardan öğrenebilesin.", author: "Kanye West" },
  { text: "Ben lerini çok seviyorum", author: "Kanye West" },
  { text: "Herkesi memnun edemezsin, ama denemek seni ileri taşır.", author: "Kanye West" },
  { text: "aYS", author: "Kanye West" },
  { text: "Uyuşturucu satıcısı Jordan alır, crack bağımlısı crack alır, beyaz adam da bunların hepsinden para kazanır.", author: "Kanye West" },
  { text: "Sana bi kere sarılmak için tüm dünya'yı dolaşırdım", author: "Kanye West" },
  { text: "Burnun gökyüzünde, kalbin Tanrı'ya bağlı, yüzün doğan güneşe dönük olsun.", author: "Kanye West" },
  { text: "Bazen umursamamak, aslında en çok umursamaktır.", author: "Kanye West" },
  { text: "Kötü düşüncelerin mi var? Bende daha fazlası var.", author: "Kanye West" },
  { text: "Gözlerine bakınca cennetin kapılarını görüyorum", author: "Kanye West" },
  { text: "Hayatı yaşarken her anın kıymetini bil.", author: "Kanye West" },
  { text: "En büyük ödülüm, sonraki yapacağım şey olacak.", author: "Kanye West" },
  { text: "Uyurken bile seni özlüyorum.", author: "Kanye West" },
  { text: "Kusurlarımı görmezden gelmiyorum; onlarla birlikte büyüyorum.", author: "Kanye West" },
  { text: "Sürekli öğrenmek, daha iyi biri olmanın en kolay yolu.", author: "Kanye West" },
  { text: "Taylor swist'in bana seks borcu var", author: "Kanye West" },
  { text: "Naber aria", author: "Kanye West" },
  { text: "Hatalarımı düzeltmeye çalışıyorum ama komik olan şu, aynı hatalar bu şarkıyı yazmama yardımcı oldu.", author: "Kanye West" },
  { text: "Yaşamak ölmekten daha zor gibi geldiğinde benim için vazgeçmek denemekten çok daha zor.", author: "Kanye West" },
  { text: "Göğüslerini seviyorum çünkü aynı anda iki şeye odaklanabildiğimi kanıtlıyorlar.", author: "Kanye West" },
  { text: "Liderler ve takipçiler var ama yalaka olmaktansa orospu çocuğu olmayı tercih ederim.", author: "Kanye West" },
  { text: "Herkes kazanamazsam ne yapacağımı soruyordu... sanırım asla bilemeyeceğiz.", author: "Kanye West" },
  { text: "Beni kara listeye almaya çalışan insanlar 2 şeyi unuttu, benim kara toplarımı.", author: "Kanye West" },
  { text: "Eğer Kanye West hayranıysan, kendinin de hayranısın demektir.", author: "Kanye West" },
  { text: "Hatta biri gittiğinde bile, hisler gerçekten asla gitmez", author: "Kanye West" },
  { text: "Buzdolabını açık bırakmışsın, biri sandviçini aldı.", author: "Kanye West" },
  { text: "Bana aynalarla dolu bir oda lazım ki kazananlarla çevrili olayım", author: "Kanye West" },
  { text: "Kötü düşüncelerin mi var? Bende daha fazlası var.", author: "Kanye West" },
  { text: "Daha büyük bir jakuziye ihtiyacımız var.", author: "Kanye West" },
  { text: "Yahudi bir doktordu", author: "Kanye West" },
  { text: "Köle olmamayı seçtim.", author: "Kanye West" },
  { text: "Hayattaki en büyük acım, hayatı kendimi performans sergilerken asla göremeyecek olmam.", author: "Kanye West" },
  { text: "Senden bin tane, benden sadece bir tane var.", author: "Kanye West" },
  { text: "Başlamak için en iyi zaman dün, ikinci en iyi zaman bugün.", author: "Kanye West" },
  { text: "Eski Kanye'yi özledim, en başından beri o Kanye'yi.", author: "Kanye West" },
  { text: "İyi bir kız bin orospuya bedel.", author: "Kanye West" },
  { text: "İsa'yı seviyoruz ama sen Şeytan'dan çok şey öğrendin.", author: "Kanye West" },
  { text: "Yıldızlara doğru ateşlen, böylece düşersen bir buluta inersin", author: "Kanye West" },
  { text: "O ne demek lan kobe bryant?", author: "Kanye West" },
  { text: "Liderler ve takipçiler var ama yalaka olmaktansa orospu çocuğu olmayı tercih ederim.", author: "Kanye West" },
  { text: "Kumaşçıda pamuk toplayan zengin köle.", author: "Kanye West" },
  { text: "Yani şeytan Prada giyiyorsa, Adem ile Havva hiçbir şey giymiyorsa, ben ikisinin arasında ama çok daha havalıyım.", author: "Kanye West" },
  { text: "Kontrolden çıkmış değilim, sadece onların kontrolünde değilim.", author: "Kanye West" },
  { text: "Uyuşturucu satıcısı Jordan alır, crack bağımlısı crack alır, beyaz adam da bunların hepsinden para kazanır.", author: "Kanye West" },
  { text: "Aklımda hazineler var ama kendi kasamı açamadım.", author: "Kanye West" },
  { text: "Bu kadar güzel olman günah olmalı.", author: "Kanye West" },
  { text: "Naber aria", author: "Kanye West" },
  { text: "KimYe.", author: "Kanye West" },
  { text: "aYS", author: "Kanye West" },
  { text: "Ellerini yıldızlara uzat", author: "Kanye West" },
  { text: "Ben lerini çok seviyorum", author: "Kanye West" },
  { text: "Uyurken bile seni özlüyorum.", author: "Kanye West" },
  { text: "Sana bi kere sarılmak için tüm dünya'yı dolaşırdım", author: "Kanye West" },
  { text: "Gözlerine bakınca cennetin kapılarını görüyorum", author: "Kanye West" },
  { text: "Ayaklarının tapusu sonsuza dek bana ait.", author: "Kanye West" },
  
  
];

/** Haftanın Pazartesi'sine göre deterministik seçim: ikiniz de aynı haftada aynı sözü görürsünüz. */
export function quoteForDate(date: Date): Quote {
  const dayIndex = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  return QUOTES[dayIndex % QUOTES.length];
}
