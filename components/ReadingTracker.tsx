"use client";

import ScribbleIcon from "./ScribbleIcon";
import { BOOK_PATH } from "@/lib/iconShapes";

interface Props {
  value: number; // 0-5
  onChange: (v: number) => void;
}

export default function ReadingTracker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <ScribbleIcon
          key={i}
          path={BOOK_PATH}
          filled={i <= value}
          color="#CFC0E3"
          onClick={() => onChange(i === value ? i - 1 : i)}
          label={`okuma ${i}`}
        />
      ))}
    </div>
  );
}
