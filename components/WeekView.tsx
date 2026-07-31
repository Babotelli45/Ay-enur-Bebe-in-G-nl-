"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  addWeeks,
  clampDate,
  formatWeekRangeLabel,
  getMonday,
  getSeason,
  getWeekDates,
  toISODate,
  APP_START_DATE,
  APP_END_DATE,
} from "@/lib/dateUtils";
import { quoteForDate } from "@/lib/quotes";
import type { DailyEntry, WeeklyNote } from "@/lib/types";
import CrayonFilterDefs from "./CrayonFilterDefs";
import BackgroundDecor from "./BackgroundDecor";
import DateNav from "./DateNav";
import DayCard from "./DayCard";
import WeeklyNotesBox from "./WeeklyNotesBox";

const ROTATIONS = [
  "-rotate-1",
  "rotate-1",
  "-rotate-[0.5deg]",
  "rotate-[0.5deg]",
  "-rotate-1",
  "rotate-1",
  "rotate-0",
  "-rotate-1",
];

function emptyEntry(iso: string): DailyEntry {
  return {
    entry_date: iso,
    activity_label: null,
    water_count: 0,
    kcal_intake_count: 0,
    kcal_burn_count: 0,
    mood: null,
    location: null,
    comment: null,
    notes: null,
    photo_url_1: null,
    photo_url_2: null,
  };
}

export default function WeekView() {
  const [monday, setMonday] = useState<Date>(() => getMonday(new Date()));
  const [entries, setEntries] = useState<Record<string, DailyEntry>>({});
  const [weeklyNote, setWeeklyNote] = useState<WeeklyNote | undefined>();

  const weekDates = useMemo(() => getWeekDates(monday), [monday]);
  const weekStartIso = toISODate(monday);
  const weekEndIso = toISODate(weekDates[6]);
  const season = useMemo(() => getSeason(weekDates[3]), [weekDates]);
  const quote = useMemo(() => quoteForDate(monday), [monday]);

  const fetchWeek = useCallback(async () => {
    const { data: dailyData } = await supabase
      .from("daily_entries")
      .select("*")
      .gte("entry_date", weekStartIso)
      .lte("entry_date", weekEndIso);

    const map: Record<string, DailyEntry> = {};
    (dailyData ?? []).forEach((row) => {
      map[row.entry_date] = row as DailyEntry;
    });
    setEntries(map);

    const { data: noteData } = await supabase
      .from("weekly_notes")
      .select("*")
      .eq("week_start", weekStartIso)
      .maybeSingle();
    setWeeklyNote((noteData as WeeklyNote) ?? undefined);
  }, [weekStartIso, weekEndIso]);

  useEffect(() => {
    fetchWeek();
  }, [fetchWeek]);

  // Realtime canlı senkronizasyon
  useEffect(() => {
    const channel = supabase
      .channel("gunluk-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "daily_entries" },
        (payload) => {
          const row = (payload.new ?? payload.old) as DailyEntry;
          if (!row?.entry_date) return;
          if (row.entry_date < weekStartIso || row.entry_date > weekEndIso) return;
          setEntries((prev) => {
            if (payload.eventType === "DELETE") {
              const next = { ...prev };
              delete next[row.entry_date];
              return next;
            }
            return { ...prev, [row.entry_date]: row };
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "weekly_notes" },
        (payload) => {
          const row = (payload.new ?? payload.old) as WeeklyNote;
          if (row?.week_start === weekStartIso) {
            setWeeklyNote(payload.eventType === "DELETE" ? undefined : row);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [weekStartIso, weekEndIso]);

  async function updateEntry(iso: string, patch: Partial<DailyEntry>) {
    const base = entries[iso] ?? emptyEntry(iso);
    const merged = { ...base, ...patch };
    setEntries((prev) => ({ ...prev, [iso]: merged }));
    await supabase.from("daily_entries").upsert(merged, { onConflict: "entry_date" });
  }

  async function updateWeeklyNote(patch: Partial<WeeklyNote>) {
    const base: WeeklyNote = weeklyNote ?? { week_start: weekStartIso, notes: null, photo_url: null };
    const merged = { ...base, ...patch };
    setWeeklyNote(merged);
    await supabase.from("weekly_notes").upsert(merged, { onConflict: "week_start" });
  }

  function goPrev() {
    setMonday((m) => clampDate(addWeeks(m, -1)));
  }
  function goNext() {
    setMonday((m) => clampDate(addWeeks(m, 1)));
  }
  function jumpTo(iso: string) {
    setMonday(getMonday(clampDate(new Date(iso))));
  }

  const canPrev = monday > APP_START_DATE;
  const canNext = monday < APP_END_DATE;

  const leftPage = weekDates.slice(0, 4); // Pzt-Per
  const rightPage = weekDates.slice(4, 7); // Cum-Paz

  return (
    <main className="min-h-screen w-full flex items-center justify-center py-8 px-3 sm:px-6 relative">
      <CrayonFilterDefs />
      <div className="relative w-full max-w-6xl">
        <BackgroundDecor season={season} />
        <DateNav
          weekLabel={formatWeekRangeLabel(monday)}
          onPrev={goPrev}
          onNext={goNext}
          onJump={jumpTo}
          canPrev={canPrev}
          canNext={canNext}
        />

        <div className="relative z-[1] pt-14">
          <p className="absolute -top-1 left-2 sm:left-6 font-hand text-lg text-ink/40 select-none">
            Ayşenur Bebeğin günlüğü
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 relative">
            {/* cilt gölgesi */}
            <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-black/10 via-black/5 to-black/10 shadow-spine z-[2]" />

            {/* SOL SAYFA */}
            <div className="torn-edge paper-texture rounded-2xl p-4 sm:p-6 shadow-page">
              <div className="grid grid-cols-2 gap-3">
                {leftPage.map((d, i) => (
                  <DayCard
                    key={toISODate(d)}
                    date={d}
                    entry={entries[toISODate(d)]}
                    onUpdate={(patch) => updateEntry(toISODate(d), patch)}
                    rotate={ROTATIONS[i]}
                  />
                ))}
              </div>
            </div>

            {/* SAĞ SAYFA */}
            <div className="torn-edge paper-texture rounded-2xl p-4 sm:p-6 shadow-page">
              <div className="grid grid-cols-2 gap-3">
                {rightPage.map((d, i) => (
                  <DayCard
                    key={toISODate(d)}
                    date={d}
                    entry={entries[toISODate(d)]}
                    onUpdate={(patch) => updateEntry(toISODate(d), patch)}
                    rotate={ROTATIONS[i + 4]}
                  />
                ))}
                <WeeklyNotesBox
                  weekStartIso={weekStartIso}
                  note={weeklyNote}
                  onUpdate={updateWeeklyNote}
                  rotate={ROTATIONS[7]}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 text-center md:text-left md:pl-4">
            <p className="font-hand text-lg text-ink/60 italic">
              “{quote.text}”{" "}
              <span className="not-italic text-sm text-ink/40">— {quote.author}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
