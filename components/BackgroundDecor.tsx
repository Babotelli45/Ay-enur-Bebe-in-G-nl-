"use client";

import type { Season } from "@/lib/dateUtils";

const DOODLES: { emoji: string; top: string; left: string; size: string; rotate: string }[] = [
  { emoji: "💍", top: "4%", left: "8%", size: "text-xl", rotate: "-rotate-12" },
  { emoji: "🐚", top: "92%", left: "6%", size: "text-lg", rotate: "rotate-6" },
  { emoji: "🎀", top: "8%", left: "92%", size: "text-xl", rotate: "rotate-12" },
  { emoji: "🐰", top: "50%", left: "2%", size: "text-lg", rotate: "-rotate-6" },
  { emoji: "🦦", top: "60%", left: "96%", size: "text-lg", rotate: "rotate-3" },
  { emoji: "🦋", top: "22%", left: "3%", size: "text-base", rotate: "rotate-12" },
  { emoji: "🌸", top: "78%", left: "94%", size: "text-lg", rotate: "-rotate-6" },
  { emoji: "🐶", top: "88%", left: "88%", size: "text-lg", rotate: "rotate-6" },
];

function SeasonLayer({ season }: { season: Season }) {
  const particles = Array.from({ length: 14 });
  const glyph =
    season === "winter"
      ? "❄"
      : season === "autumn"
      ? "🍂"
      : season === "spring"
      ? "🌸"
      : "☀";

  return (
    <div className="season-layer">
      {particles.map((_, i) => (
        <span
          key={i}
          className="absolute text-sm opacity-30 animate-fall"
          style={{
            left: `${(i * 7.3) % 100}%`,
            animationDuration: `${10 + (i % 6)}s`,
            animationDelay: `${i * 0.6}s`,
          }}
        >
          {glyph}
        </span>
      ))}
    </div>
  );
}

function CastleWatermark() {
  return (
    <svg
      viewBox="0 0 400 160"
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[420px] opacity-[0.14] pointer-events-none"
      aria-hidden
    >
      <g fill="#B87FA0">
        <rect x="40" y="70" width="30" height="60" />
        <polygon points="55,45 30,70 80,70" />
        <rect x="330" y="70" width="30" height="60" />
        <polygon points="345,45 320,70 370,70" />
        <rect x="120" y="55" width="26" height="75" />
        <polygon points="133,30 108,55 158,55" />
        <rect x="255" y="55" width="26" height="75" />
        <polygon points="268,30 243,55 293,55" />
        <rect x="170" y="20" width="60" height="110" />
        <polygon points="200,-10 160,20 240,20" />
        <rect x="60" y="130" width="280" height="14" />
      </g>
    </svg>
  );
}

function Candle({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`absolute bottom-4 ${side === "left" ? "left-4" : "right-4"} flex flex-col items-center opacity-70`}
    >
      <span className="w-1.5 h-3 rounded-full bg-gradient-to-t from-orange-400 to-yellow-200 animate-flicker" />
      <span className="w-2 h-8 bg-[#fdf6e3] rounded-sm border border-ink/10" />
    </div>
  );
}

export default function BackgroundDecor({ season }: { season: Season }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <CastleWatermark />
      <SeasonLayer season={season} />
      {DOODLES.map((d, i) => (
        <span
          key={i}
          className={`absolute select-none opacity-25 ${d.size} ${d.rotate}`}
          style={{ top: d.top, left: d.left }}
        >
          {d.emoji}
        </span>
      ))}
      <Candle side="left" />
      <Candle side="right" />
    </div>
  );
}
