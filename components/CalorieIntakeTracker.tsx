"use client";

import ScribbleIcon from "./ScribbleIcon";
import { STAR_PATH } from "@/lib/iconShapes";

interface Props {
  value: number; // 0-5
  onChange: (v: number) => void;
}

export default function CalorieIntakeTracker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-label text-ink/70 mr-1">⭐ Alım</span>
      {[1, 2, 3, 4, 5].map((i) => (
        <ScribbleIcon
          key={i}
          path={STAR_PATH}
          filled={i <= value}
          color="#F0C63A"
          glow
          onClick={() => onChange(i === value ? i - 1 : i)}
          label={`kalori alım yıldızı ${i}`}
        />
      ))}
    </div>
  );
}
