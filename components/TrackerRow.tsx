"use client";

import { useState } from "react";

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

  // Her ikonun kendi rengine uygun ve eşit yoğunlukta parlama sınıfı
  const getGlowClass = () => {
    const src = iconSrc.toLowerCase();
    const label = labelPrefix.toLowerCase();

    if (
      src.includes("okuma") ||
      src.includes("kitap") ||
      label.includes("okuma") ||
      label.includes("kitap")
    ) {
      return "drop-shadow-[0_0_4px_rgba(168,85,247,0.65)]"; // Mor (Kitap)
    }
    if (
      src.includes("su") ||
      src.includes("water") ||
      label.includes("su")
    ) {
      return "drop-shadow-[0_0_4px_rgba(56,189,248,0.65)]"; // Mavi (Su)
    }
    if (
      src.includes("yildiz") ||
      src.includes("alim") ||
      src.includes("food") ||
      src.includes("kalori") ||
      label.includes("alım") ||
      label.includes("alim")
    ) {
      return "drop-shadow-[0_0_3.5px_rgba(250,204,21,0.5)]"; // Hafifletilmiş Sarı (Alım)
    }
    if (
      src.includes("ates") ||
      src.includes("yakim") ||
      src.includes("burn") ||
      label.includes("yakım") ||
      label.includes("yakim")
    ) {
      return "drop-shadow-[0_0_4px_rgba(248,113,113,0.65)]"; // Kırmızı/Turuncu (Yakım)
    }

    return "drop-shadow-[0_0_3.5px_rgba(250,204,21,0.4)]";
  };

  const glowClass = getGlowClass();

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const active = i <= value;
        const icon = broken ? (
          <span
            className={`text-lg leading-none inline-block transition-all ${
              active ? `opacity-100 ${glowClass}` : "opacity-30 grayscale"
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
            className={`w-6 h-6 object-contain mix-blend-multiply transition-all ${
              active ? `opacity-100 ${glowClass}` : "opacity-30 grayscale"
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
