"use client";

import TrackerRow from "./TrackerRow";

interface Props {
  value: number; // 0-5
  onChange: (v: number) => void;
}

export default function BurnTracker({ value, onChange }: Props) {
  return (
    <TrackerRow
      value={value}
      onChange={onChange}
      iconSrc="/icons/yakım.png"
      fallbackEmoji="🔥"
      labelPrefix="kalori yakım ateşi"
      captions={{ 1: "1200 kcal", 5: "2000 kcal" }}
    />
  );
}
