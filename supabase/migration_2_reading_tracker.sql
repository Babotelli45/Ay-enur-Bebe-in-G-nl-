-- =====================================================================
-- Migration 2: Okuma (Kitap) Tracker sütunu ekler
-- Bunu Supabase Dashboard > SQL Editor içine yapıştırıp çalıştırın.
-- Daha önce schema.sql'i çalıştırmış olmanız yeterli, bu betik sadece
-- eksik olan yeni sütunu ekler (idempotent: tekrar çalıştırılabilir).
-- =====================================================================

alter table public.daily_entries
  add column if not exists reading_count smallint not null default 0
  check (reading_count between 0 and 5);
