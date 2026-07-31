-- =====================================================================
-- Ayşenur Bebeğin Günlüğü — Supabase kurulum betiği
-- Bunu Supabase Dashboard > SQL Editor içine yapıştırıp çalıştırın.
-- =====================================================================

-- 1) GÜNLÜK KAYITLAR TABLOSU
create table if not exists public.daily_entries (
  entry_date date primary key,
  activity_label text,
  water_count smallint not null default 0 check (water_count between 0 and 5),
  kcal_intake_count smallint not null default 0 check (kcal_intake_count between 0 and 5),
  kcal_burn_count smallint not null default 0 check (kcal_burn_count between 0 and 5),
  mood text check (mood in ('iyi', 'kotu', 'huysuz', 'yorgun', 'hasta') or mood is null),
  location text,
  comment text,
  notes text,
  photo_url_1 text,
  photo_url_2 text,
  updated_at timestamptz not null default now()
);

-- 2) HAFTALIK NOT / GENEL FOTOĞRAF TABLOSU
create table if not exists public.weekly_notes (
  week_start date primary key,
  notes text,
  photo_url text,
  updated_at timestamptz not null default now()
);

-- 3) updated_at otomatik güncelleme
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_daily_entries_updated_at on public.daily_entries;
create trigger trg_daily_entries_updated_at
  before update on public.daily_entries
  for each row execute function public.set_updated_at();

drop trigger if exists trg_weekly_notes_updated_at on public.weekly_notes;
create trigger trg_weekly_notes_updated_at
  before update on public.weekly_notes
  for each row execute function public.set_updated_at();

-- 4) ROW LEVEL SECURITY
-- Not: Bu uygulamada giriş/kimlik doğrulama (auth) yok; sadece siz ikiniz
-- kullanacaksınız ve link'i kimseyle paylaşmayacaksınız varsayımıyla
-- "anon" rolüne tam okuma/yazma izni veriyoruz. Bu, linki bilen HERKESİN
-- verileri okuyup değiştirebileceği anlamına gelir — bilerek bu şekilde
-- (spesifikasyonunuzda auth istenmedi).

alter table public.daily_entries enable row level security;
alter table public.weekly_notes enable row level security;

drop policy if exists "anon tam erişim - daily_entries" on public.daily_entries;
create policy "anon tam erişim - daily_entries"
  on public.daily_entries
  for all
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "anon tam erişim - weekly_notes" on public.weekly_notes;
create policy "anon tam erişim - weekly_notes"
  on public.weekly_notes
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- 5) REALTIME (canlı senkronizasyon) için tabloları publication'a ekle
-- (idempotent: betik ikinci kez çalıştırılırsa hata vermez)
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'daily_entries'
  ) then
    alter publication supabase_realtime add table public.daily_entries;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'weekly_notes'
  ) then
    alter publication supabase_realtime add table public.weekly_notes;
  end if;
end $$;

-- 6) STORAGE: fotoğraflar bucket'ı (public)
insert into storage.buckets (id, name, public)
values ('fotograflar', 'fotograflar', true)
on conflict (id) do nothing;

drop policy if exists "herkes okuyabilir - fotograflar" on storage.objects;
create policy "herkes okuyabilir - fotograflar"
  on storage.objects for select
  to public
  using (bucket_id = 'fotograflar');

drop policy if exists "anon yükleyebilir - fotograflar" on storage.objects;
create policy "anon yükleyebilir - fotograflar"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'fotograflar');

drop policy if exists "anon güncelleyebilir - fotograflar" on storage.objects;
create policy "anon güncelleyebilir - fotograflar"
  on storage.objects for update
  to anon, authenticated
  using (bucket_id = 'fotograflar');

drop policy if exists "anon silebilir - fotograflar" on storage.objects;
create policy "anon silebilir - fotograflar"
  on storage.objects for delete
  to anon, authenticated
  using (bucket_id = 'fotograflar');

-- =====================================================================
-- Bitti. Şimdi Project Settings > API sayfasından Project URL ve
-- anon public key'i alıp .env.local dosyanıza yapıştırın.
-- =====================================================================
