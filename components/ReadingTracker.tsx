"use client";

import TrackerRow from "./TrackerRow";

interface Props {
  value: number; // 0-5
  onChange: (v: number) => void;
}

export default function ReadingTracker({ value, onChange }: Props) {
  return (
    <TrackerRow
      value={value}
      onChange={onChange}
      iconSrc="/icons/okuma.png"
      fallbackEmoji="📖"
      labelPrefix="okuma"
    />
  );
}
