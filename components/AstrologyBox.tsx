"use client";

import { isMercuryRetrograde, weeklyEnergyFor } from "@/lib/astrology";

interface Props {
  weekStart: Date;
  weekEnd: Date;
  rotate?: string;
}

export default function AstrologyBox({ weekStart, weekEnd, rotate = "" }: Props) {
  const retro = isMercuryRetrograde(weekStart, weekEnd);
  const energy = weeklyEnergyFor(weekStart);

  return (
    <div className={`paper-texture ink-border shadow-page p-4 rounded-2xl ${rotate}`}>
      <div className="flex items-center justify-between border-b border-ink/15 pb-1 mb-2">
        <span className="font-hand text-xl text-blush-deep font-semibold">
          ♐ Yay · ♒ Kova Yükselen
        </span>
      </div>
      <p className="font-label text-sm text-ink/80 mb-1">{energy.title}</p>
      <p className="font-body text-sm text-ink/70 leading-relaxed">{energy.text}</p>
      {retro && (
        <p className="mt-2 text-xs font-label text-ink/50 bg-lavender/30 rounded-full px-3 py-1 inline-block">
          ☿ Bu hafta Merkür retrosunda — iletişimde biraz daha dikkatli olun.
        </p>
      )}
    </div>
  );
}
