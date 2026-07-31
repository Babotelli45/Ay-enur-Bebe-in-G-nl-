"use client";

import ScribbleIcon from "./ScribbleIcon";
import { CUP_PATH } from "@/lib/iconShapes";

interface Props {
  value: number; // 0-5
  onChange: (v: number) => void;
}

export default function WaterTracker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-label text-ink/70 mr-1">💧 Su</span>
      {[1, 2, 3, 4, 5].map((i) => (
        <ScribbleIcon
          key={i}
          path={CUP_PATH}
          filled={i <= value}
          color="#7EC8E3"
          onClick={() => onChange(i === value ? i - 1 : i)}
          label={`su bardağı ${i}`}
        />
      ))}
    </div>
  );
}
