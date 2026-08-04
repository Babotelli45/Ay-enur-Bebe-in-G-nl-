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

// İkon türüne göre parlama rengi seçen fonksiyon
const getGlowStyle = (prefix: string) => {
  const p = prefix.toLowerCase();
  if (p.includes("okuma") || p.includes("kitap")) {
    return "drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]"; // Mor Parlama
  }
  if (p.includes("su")) {
    return "drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]"; // Mavi Parlama
  }
  if (p.includes("alım") || p.includes("yemek") || p.includes("beslenme")) {
    return "drop-shadow-[0_0_6px_rgba(74,222,128,0.8)]"; // Yeşil Parlama
  }
  if (p.includes("yakım") || p.includes("kalori") || p.includes("spor")) {
    return "drop-shadow-[0_0_6px_rgba(251,146,60,0.8)]"; // Turuncu Parlama
  }
  return "drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"; // Varsayılan Tatlı Pembe
};

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

  const glowClass = getGlowStyle(labelPrefix);

  return (
    <div className="relative flex items-center gap-1">
      {celebrate && <SparkleBurst spread={26} />}
      {[1, 2, 3, 4, 5].map((i) => {
        const active = i <= value;
        const icon = broken ? (
          <span
            className={`text-lg leading-none inline-block transition-opacity ${
              active ? `opacity-100 dark:opacity-90 ${glowClass}` : "opacity-30 dark:opacity-40 grayscale"
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
            className={`w-6 h-6 object-contain mix-blend-multiply dark:mix-blend-normal transition-all ${
              active
                ? `opacity-100 dark:opacity-90 ${glowClass}`
                : "opacity-30 dark:opacity-35 grayscale"
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
              className={`text-[8px] leading-none font-label text-ink/40 dark:text-white/50 mt-0.5 whitespace-nowrap ${
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
