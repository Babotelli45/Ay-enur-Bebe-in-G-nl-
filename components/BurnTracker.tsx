"use client";

import ScribbleIcon from "./ScribbleIcon";
import { FLAME_PATH } from "@/lib/iconShapes";

interface Props {
  value: number; // 0-5
  onChange: (v: number) => void;
}

export default function BurnTracker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-label text-ink/70 mr-1">🔥 Yakım</span>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col items-center">
          <ScribbleIcon
            path={FLAME_PATH}
            filled={i <= value}
            color="#E8735C"
            onClick={() => onChange(i === value ? i - 1 : i)}
            label={`kalori yakım ateşi ${i}`}
          />
          <span
            className={`text-[8px] leading-none font-label text-ink/40 mt-0.5 whitespace-nowrap ${
              i === 1 || i === 5 ? "" : "invisible"
            }`}
          >
            {i === 1 ? "1200 kcal" : i === 5 ? "2000 kcal" : "-"}
          </span>
        </div>
      ))}
    </div>
  );
}
