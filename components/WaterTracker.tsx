"use client";

import TrackerRow from "./TrackerRow";

interface Props {
  value: number; // 0-5
  onChange: (v: number) => void;
}

export default function WaterTracker({ value, onChange }: Props) {
  return (
    <TrackerRow
      value={value}
      onChange={onChange}
      iconSrc="/icons/su.png"
      fallbackEmoji="💧"
      labelPrefix="su bardağı"
    />
  );
}
