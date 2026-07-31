# Ayşenur Bebeğin Günlüğü 🌸

Next.js + Supabase ile yapılmış, mobil öncelikli, ortak kullanılan haftalık günlük/PWA uygulaması.

## ⚠️ Önce oku: bilmen gerekenler

1. **Kimlik bilgisi düzeltmesi:** Bana verdiğin `SUPABASE_URL` değeri aslında bir URL değil, "publishable key" formatındaydı. Gerçek proje URL'nizi anon key'inizin içinden çözdüm: `https://tlnkmydxlpcmjsxvsdky.supabase.co`. Yine de Dashboard'dan (Project Settings → API) doğrulayın.
2. **Auth yok, güvenlik notu:** Spesifikasyonda istendiği gibi giriş ekranı yok — linki bilen herkes okuyup yazabilir. İkiniz için bu muhtemelen sorun değil, ama linki kimseyle paylaşmayın.
3. **Bu kod test-derlenmedi:** Bu ortamda internet erişimim olmadığı için `npm install` çalıştırıp gerçek bir derleme yapamadım. Kodu satır satır dikkatle yazdım ama ilk `npm run dev` çalıştırmanızda küçük bir hata çıkarsa (örn. bir tip hatası), hatayı bana yapıştırın, birlikte düzeltelim.

## Kurulum Adımları

### 1) Supabase tarafı
1. Supabase projenizin SQL Editor'ünü açın.
2. `supabase/schema.sql` dosyasının tüm içeriğini yapıştırıp **Run** deyin. Bu, `daily_entries` ve `weekly_notes` tablolarını, RLS politikalarını, realtime yayınını ve `fotograflar` storage bucket'ını oluşturur.
3. Project Settings → API sayfasından **Project URL** ve **anon public key** değerlerini kopyalayın.

### 2) Proje kurulumu (kendi bilgisayarınızda, internet olan bir yerde)
```bash
cd aysenur-gunlugu
npm install
cp .env.local.example .env.local
# .env.local dosyasını açıp gerçek Supabase URL ve anon key'inizi yapıştırın
npm run dev
```
Tarayıcıda `http://localhost:3000` adresini açın.

### 3) Canlıya alma (Vercel — ücretsiz plan yeterli)
1. Bu klasörü bir GitHub reposuna yükleyin (veya `vercel` CLI ile doğrudan deploy edin).
2. [vercel.com](https://vercel.com) üzerinden "New Project" ile repoyu içe aktarın.
3. Environment Variables kısmına `.env.local` içindeki iki değişkeni ekleyin.
4. Deploy edin — birkaç dakika içinde `https://....vercel.app` linkiniz hazır olur.
5. Bu linki kız arkadaşınızla paylaşın; telefonda Safari'de açıp "Ana Ekrana Ekle" ile PWA olarak kurabilir.

## Özellikler
- 2 açık ajanda sayfası görünümünde haftalık düzen (Pzt–Per sol sayfa, Cum–Paz + Haftalık Notlar sağ sayfa)
- Her gün kutusunda: hızlı etkinlik seçici (5 kategori, çok adımlı popup), su/kalori-alım/kalori-yakım/ruh hali takipçileri (el çizimi "crayon" dolgu efektiyle), yer/yorum/not alanları, 2 fotoğraf çerçevesi
- Supabase Realtime ile iki taraf arasında canlı senkronizasyon
- Fotoğraflar Supabase Storage'a (`fotograflar` bucket) yükleniyor
- Mevsime göre değişen arka plan efektleri (yaz/güz/kış/ilkbahar), peri masalı şatosu ve mum motifleri
- 1 Ağustos 2026 – 31 Aralık 2030 arası tarih aralığı, haftalık ileri/geri gezinme + tarihe atlama
- PWA: ana ekrana eklenebilir, temel çevrimdışı önbellek

## Notlar / genişletme fikirleri
- Aktivite geçmişini (`daily_entries` tablosu) zamanla filtreleyip basit bir "istatistik" sayfası eklenebilir.
- Fotoğraf silme işlemi şu an sadece veritabanındaki URL referansını temizliyor; Storage'daki dosyayı da silmek isterseniz `supabase.storage.from('fotograflar').remove([...])` çağrısı eklenebilir.
- İsterseniz haftalık e-posta/bildirim hatırlatıcısı için Supabase Edge Functions kullanılabilir.
