"use client";

import { useEffect, useRef, useState } from "react";
import SparkleBurst from "./SparkleBurst";

interface Props {
  value: number; // 0-5
  onChange: (v: number) => void;
  iconSrc: string;
  fallbackEmoji: string;
  labelPrefix: string;
  captions?: Record<number, string>; // örn: {1: "1200 kcal", 5: "2000 kcal"}
}

export default function TrackerRow({
  value,
  onChange,
  iconSrc,
  fallbackEmoji,
  labelPrefix,
  captions,
}: Props) {
  const [broken, setBroken] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const prevValueRef = useRef(value);

  // 5/5'e yeni ulaşıldığında kısa bir pırıltı patlaması tetikle
  useEffect(() => {
    if (value === 5 && prevValueRef.current !== 5) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 900);
      prevValueRef.current = value;
      return () => clearTimeout(t);
    }
    prevValueRef.current = value;
  }, [value]);

  return (
    <div className="relative flex items-center gap-1">
      {celebrate && <SparkleBurst spread={26} />}
      {[1, 2, 3, 4, 5].map((i) => {
        const active = i <= value;
        const icon = broken ? (
          <span
            className={`text-lg leading-none inline-block transition-opacity ${
              active ? "opacity-100" : "opacity-30 grayscale"
            }`}
          >
            {fallbackEmoji}
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconSrc}
            alt=""
            onError={() => setBroken(true)}
            className={`w-6 h-6 object-contain mix-blend-multiply transition-opacity ${
              active ? "opacity-100" : "opacity-30 grayscale"
            }`}
          />
        );

        const button = (
          <button
            type="button"
            onClick={() => onChange(i === value ? i - 1 : i)}
            aria-label={`${labelPrefix} ${i}`}
            aria-pressed={active}
            className="transition-transform hover:scale-110 active:scale-95"
          >
            {icon}
          </button>
        );

        if (!captions) {
          return <div key={i}>{button}</div>;
        }

        return (
          <div key={i} className="flex flex-col items-center">
            {button}
            <span
              className={`text-[8px] leading-none font-label text-ink/40 mt-0.5 whitespace-nowrap ${
                captions[i] ? "" : "invisible"
              }`}
            >
              {captions[i] ?? "-"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
