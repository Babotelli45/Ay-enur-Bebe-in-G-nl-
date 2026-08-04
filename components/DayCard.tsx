"use client";

import { useState } from "react";
import { formatDayLabel, toISODate } from "@/lib/dateUtils";
import WaterTracker from "./WaterTracker";
import CalorieIntakeTracker from "./CalorieIntakeTracker";
import BurnTracker from "./BurnTracker";
import ReadingTracker from "./ReadingTracker";
import MoodTracker, { MoodId } from "./MoodTracker";
import PhotoFrame from "./PhotoFrame";
import ActivityPickerModal from "./ActivityPickerModal";
import type { DailyEntry } from "@/lib/types";

interface Props {
  date: Date;
  entry: DailyEntry | undefined;
  onUpdate: (patch: Partial<DailyEntry>) => void;
  rotate: string; // hafif rastgele döndürme sınıfı
}

export default function DayCard({ date, entry, onUpdate, rotate }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [location, setLocation] = useState(entry?.location ?? "");
  const [comment, setComment] = useState(entry?.comment ?? "");
  const [notes, setNotes] = useState(entry?.notes ?? "");
  const isoDate = toISODate(date);

  const isComplete =
    (entry?.reading_count ?? 0) >= 1 &&
    (entry?.water_count ?? 0) >= 1 &&
    (entry?.kcal_intake_count ?? 0) >= 1 &&
    (entry?.kcal_burn_count ?? 0) >= 1 &&
    Boolean(entry?.photo_url_1 || entry?.photo_url_2);

  return (
    <div
      className={`paper-texture ink-border shadow-page relative flex flex-col gap-2 p-3 rounded-2xl ${rotate}`}
    >
      <div className="flex items-center justify-between border-b border-ink/15 pb-1">
        <span className="font-hand text-2xl text-blush-deep font-semibold flex items-center gap-1.5">
          {formatDayLabel(date)}
          {isComplete && (
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blush-deep text-white text-xs animate-pop"
              title="Gün tamamlandı!"
              aria-label="gün tamamlandı"
            >
              ✓
            </span>
          )}
        </span>
      </div>

      {/* 1. Hızlı Etkinlik Seçici */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={`w-full text-left rounded-lg bg-white/50 hover:bg-white/80 px-2 py-1.5 font-label text-sm text-ink border border-ink/10 truncate transition-colors ${
            entry?.activity_label ? "pr-7" : ""
          }`}
        >
          {entry?.activity_label ? (
            <span className="text-blush-deep">✎ {entry.activity_label}</span>
          ) : (
            <span className="text-ink/40">+ bugünü seç...</span>
          )}
        </button>
        {entry?.activity_label && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({ activity_label: null });
            }}
            aria-label="etkinliği sil"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full text-ink/40 hover:text-ink hover:bg-white/80 text-xs transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Trackerlar */}
      <ReadingTracker
        value={entry?.reading_count ?? 0}
        onChange={(v) => onUpdate({ reading_count: v })}
      />
      <WaterTracker
        value={entry?.water_count ?? 0}
        onChange={(v) => onUpdate({ water_count: v })}
      />
      <CalorieIntakeTracker
        value={entry?.kcal_intake_count ?? 0}
        onChange={(v) => onUpdate({ kcal_intake_count: v })}
      />
      <BurnTracker
        value={entry?.kcal_burn_count ?? 0}
        onChange={(v) => onUpdate({ kcal_burn_count: v })}
      />
      <MoodTracker
        value={(entry?.mood as MoodId) ?? null}
        onChange={(v) => onUpdate({ mood: v })}
      />

      {/* Detaylar */}
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onBlur={() => onUpdate({ location })}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        placeholder="Yer: ..."
        enterKeyHint="done"
        className="bg-transparent border-b border-ink/20 font-label text-sm text-ink placeholder:text-ink/30 outline-none py-0.5"
      />
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onBlur={() => onUpdate({ comment })}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        placeholder="Yorum / Değerlendirme..."
        enterKeyHint="done"
        className="bg-transparent border-b border-ink/20 font-label text-sm text-ink placeholder:text-ink/30 outline-none py-0.5"
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={() => onUpdate({ notes })}
        placeholder="Serbest not..."
        rows={2}
        className="bg-transparent border-b border-ink/20 font-label text-sm text-ink placeholder:text-ink/30 outline-none resize-none py-0.5"
      />

      {/* Fotoğraflar */}
      <div className="grid grid-cols-2 gap-2 mt-1">
        <PhotoFrame
          url={entry?.photo_url_1 ?? null}
          pathPrefix={`${isoDate}/foto1`}
          onChange={(url) => onUpdate({ photo_url_1: url })}
        />
        <PhotoFrame
          url={entry?.photo_url_2 ?? null}
          pathPrefix={`${isoDate}/foto2`}
          onChange={(url) => onUpdate({ photo_url_2: url })}
        />
      </div>

      {modalOpen && (
        <ActivityPickerModal
          onClose={() => setModalOpen(false)}
          onConfirm={(label) => onUpdate({ activity_label: label })}
        />
      )}
    </div>
  );
}
