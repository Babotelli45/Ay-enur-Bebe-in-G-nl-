"use client";

import { APP_END_DATE, APP_START_DATE, toISODate } from "@/lib/dateUtils";
import ThemeToggle from "./ThemeToggle";

interface Props {
  weekLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onJump: (iso: string) => void;
  canPrev: boolean;
  canNext: boolean;
}

export default function DateNav({
  weekLabel,
  onPrev,
  onNext,
  onJump,
  canPrev,
  canNext,
}: Props) {
  return (
    <div className="absolute top-3 right-3 sm:top-5 sm:right-8 z-10 flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        {/* Gece/Gündüz tema tuşu — tarih seçiminin solunda */}
        <ThemeToggle />
        <div className="flex items-center gap-2 bg-white/70 dark:bg-white/10 rounded-full px-2 py-1 shadow-sm">
          <button
            onClick={onPrev}
            disabled={!canPrev}
            className="w-7 h-7 rounded-full hover:bg-white dark:hover:bg-white/20 disabled:opacity-30 font-label text-ink"
            aria-label="önceki hafta"
          >
            ‹
          </button>
          <span className="font-label text-xs sm:text-sm text-ink whitespace-nowrap px-1">
            {weekLabel}
          </span>
          <button
            onClick={onNext}
            disabled={!canNext}
            className="w-7 h-7 rounded-full hover:bg-white dark:hover:bg-white/20 disabled:opacity-30 font-label text-ink"
            aria-label="sonraki hafta"
          >
            ›
          </button>
        </div>
      </div>
      <input
        type="date"
        min={toISODate(APP_START_DATE)}
        max={toISODate(APP_END_DATE)}
        onChange={(e) => e.target.value && onJump(e.target.value)}
        className="text-[11px] font-label rounded-full bg-white/60 dark:bg-white/10 px-2 py-0.5 text-ink outline-none"
      />
    </div>
  );
}
