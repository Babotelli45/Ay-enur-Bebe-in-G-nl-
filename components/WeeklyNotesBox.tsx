"use client";

import { useState } from "react";
import PhotoFrame from "./PhotoFrame";
import type { WeeklyNote } from "@/lib/types";

interface Props {
  weekStartIso: string;
  note: WeeklyNote | undefined;
  onUpdate: (patch: Partial<WeeklyNote>) => void;
  rotate: string;
}

export default function WeeklyNotesBox({
  weekStartIso,
  note,
  onUpdate,
  rotate,
}: Props) {
  const [text, setText] = useState(note?.notes ?? "");

  return (
    <div
      className={`paper-texture ink-border shadow-page relative flex flex-col gap-2 p-3 rounded-2xl ${rotate}`}
    >
      <div className="flex items-center justify-between border-b border-ink/15 pb-1">
        <span className="font-hand text-2xl text-blush-deep font-semibold">
          Haftalık Notlar 🕊️
        </span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => onUpdate({ notes: text })}
        placeholder="Bu hafta aklımızda kalanlar..."
        rows={5}
        className="bg-transparent border-b border-ink/20 font-label text-sm text-ink placeholder:text-ink/30 outline-none resize-none py-0.5 flex-1"
      />
      <div className="w-1/2 mx-auto">
        <PhotoFrame
          url={note?.photo_url ?? null}
          pathPrefix={`${weekStartIso}/hafta-foto`}
          onChange={(url) => onUpdate({ photo_url: url })}
        />
      </div>
    </div>
  );
}
