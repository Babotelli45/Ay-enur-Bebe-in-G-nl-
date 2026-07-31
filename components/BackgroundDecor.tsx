"use client";

import type { Season } from "@/lib/dateUtils";
import type { HolidayTheme } from "@/lib/holidays";

/* ---------- küçük el çizimi ikon bileşenleri (emoji karşılığı olmayanlar) ---------- */

function DachshundDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} aria-hidden>
      <g fill="currentColor">
        <ellipse cx="30" cy="18" rx="22" ry="7.5" />
        <circle cx="54" cy="14" r="6.5" />
        <ellipse cx="59" cy="8" rx="2.6" ry="4.5" transform="rotate(25 59 8)" />
        <rect x="10" y="23" width="3.5" height="7" rx="1.7" />
        <rect x="20" y="23" width="3.5" height="7" rx="1.7" />
        <rect x="38" y="23" width="3.5" height="7" rx="1.7" />
        <rect x="48" y="23" width="3.5" height="7" rx="1.7" />
        <path
          d="M8 17 Q0 15 2 9"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function NecklaceDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path
        d="M6 6 Q20 26 34 6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="20" cy="27" r="3.6" fill="currentColor" />
    </svg>
  );
}

/* ---------- serpiştirilmiş süs figürleri ---------- */

type DoodleKind = "emoji" | "dachshund" | "necklace" | "letter";

interface DoodleSpot {
  kind: DoodleKind;
  emoji?: string;
  top: string;
  left: string;
  size: string;
  rotate: string;
  color?: string;
}

const DOODLES: DoodleSpot[] = [
  { kind: "emoji", emoji: "💍", top: "3%", left: "4%", size: "text-xl", rotate: "-rotate-12" },
  { kind: "necklace", top: "14%", left: "1.5%", size: "w-7 h-7", rotate: "rotate-6", color: "text-gold" },
  { kind: "emoji", emoji: "💎", top: "34%", left: "2%", size: "text-lg", rotate: "rotate-6" },
  { kind: "emoji", emoji: "🐚", top: "92%", left: "5%", size: "text-lg", rotate: "rotate-6" },
  { kind: "emoji", emoji: "🕯️", top: "63%", left: "1%", size: "text-lg", rotate: "-rotate-3" },
  { kind: "emoji", emoji: "🌸", top: "8%", left: "16%", size: "text-lg", rotate: "-rotate-6" },
  { kind: "emoji", emoji: "🦋", top: "90%", left: "20%", size: "text-base", rotate: "rotate-12" },

  { kind: "emoji", emoji: "🎀", top: "4%", left: "94%", size: "text-xl", rotate: "rotate-12" },
  { kind: "emoji", emoji: "🐰", top: "18%", left: "97%", size: "text-lg", rotate: "-rotate-6" },
  { kind: "emoji", emoji: "🦦", top: "44%", left: "96%", size: "text-lg", rotate: "rotate-3" },
  { kind: "emoji", emoji: "🦋", top: "68%", left: "95%", size: "text-base", rotate: "-rotate-12" },
  { kind: "emoji", emoji: "🌸", top: "86%", left: "92%", size: "text-lg", rotate: "-rotate-6" },
  { kind: "emoji", emoji: "💎", top: "58%", left: "98%", size: "text-base", rotate: "rotate-6" },

  { kind: "dachshund", top: "96%", left: "32%", size: "w-12 h-6", rotate: "rotate-0", color: "text-[#C9975A]" },
  { kind: "dachshund", top: "2.5%", left: "62%", size: "w-10 h-5", rotate: "rotate-180", color: "text-[#C9975A]/80" },

  { kind: "letter", emoji: "𝒜", top: "1%", left: "46%", size: "text-2xl", rotate: "-rotate-6" },
  { kind: "letter", emoji: "𝒜", top: "97%", left: "56%", size: "text-2xl", rotate: "rotate-6" },
];

function Doodle({ spot, opacity = "opacity-25" }: { spot: DoodleSpot; opacity?: string }) {
  const commonClass = `absolute select-none ${opacity} ${spot.size} ${spot.rotate} ${spot.color ?? ""}`;
  const style = { top: spot.top, left: spot.left };

  if (spot.kind === "dachshund") {
    return (
      <span className={commonClass} style={style}>
        <DachshundDoodle className="w-full h-full" />
      </span>
    );
  }
  if (spot.kind === "necklace") {
    return (
      <span className={commonClass} style={style}>
        <NecklaceDoodle className="w-full h-full" />
      </span>
    );
  }
  if (spot.kind === "letter") {
    return (
      <span className={`${commonClass} font-hand text-blush-deep`} style={style}>
        {spot.emoji}
      </span>
    );
  }
  return (
    <span className={commonClass} style={style}>
      {spot.emoji}
    </span>
  );
}

/* ---------- mevsimsel efektler ---------- */

function FallingLayer({
  glyphs,
  count,
  opacity = "opacity-30",
}: {
  glyphs: string[];
  count: number;
  opacity?: string;
}) {
  const particles = Array.from({ length: count });
  return (
    <>
      {particles.map((_, i) => (
        <span
          key={`fall-${i}`}
          className={`absolute text-sm ${opacity} animate-fall`}
          style={{
            left: `${(i * 6.7) % 100}%`,
            animationDuration: `${9 + (i % 7)}s`,
            animationDelay: `${i * 0.55}s`,
          }}
        >
          {glyphs[i % glyphs.length]}
        </span>
      ))}
    </>
  );
}

function SparkleLayer({
  glyphs,
  count,
  color,
}: {
  glyphs: string[];
  count: number;
  color?: string;
}) {
  const particles = Array.from({ length: count });
  return (
    <>
      {particles.map((_, i) => (
        <span
          key={`sparkle-${i}`}
          className={`absolute text-xs opacity-40 animate-sparkle ${color ?? ""}`}
          style={{
            top: `${(i * 13) % 90 + 3}%`,
            left: `${(i * 23) % 96 + 2}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {glyphs[i % glyphs.length]}
        </span>
      ))}
    </>
  );
}

function FloatingLayer({
  glyphs,
  count,
}: {
  glyphs: string[];
  count: number;
}) {
  const particles = Array.from({ length: count });
  return (
    <>
      {particles.map((_, i) => (
        <span
          key={`float-${i}`}
          className="absolute text-base opacity-25 animate-float"
          style={{
            left: `${(i * 8.9) % 100}%`,
            animationDuration: `${11 + (i % 6)}s`,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          {glyphs[i % glyphs.length]}
        </span>
      ))}
    </>
  );
}

function SeasonLayer({ season }: { season: Season }) {
  if (season === "summer") {
    return (
      <div className="season-layer">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/25 via-transparent to-transparent" />
        <SparkleLayer glyphs={["✦", "☀️", "✨"]} count={12} color="text-amber-400" />
      </div>
    );
  }
  if (season === "autumn") {
    return (
      <div className="season-layer">
        <FallingLayer glyphs={["🍂", "🍁"]} count={14} />
      </div>
    );
  }
  if (season === "winter") {
    return (
      <div className="season-layer">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/20 via-transparent to-transparent" />
        <FallingLayer glyphs={["❄️"]} count={16} opacity="opacity-40" />
      </div>
    );
  }
  // spring
  return (
    <div className="season-layer">
      <FallingLayer glyphs={["🌸", "🌷"]} count={10} />
      <SparkleLayer glyphs={["🍃", "✨"]} count={8} color="text-emerald-500" />
    </div>
  );
}

/* ---------- özel gün / bayram temaları ---------- */

function ChristmasTree() {
  return (
    <svg
      viewBox="0 0 100 140"
      className="absolute bottom-0 left-2 sm:left-8 w-16 sm:w-24 opacity-20 pointer-events-none"
      aria-hidden
    >
      <g fill="#6E9B6E">
        <polygon points="50,5 20,45 80,45" />
        <polygon points="50,30 15,72 85,72" />
        <polygon points="50,55 10,110 90,110" />
      </g>
      <rect x="43" y="110" width="14" height="16" fill="#8B5E34" />
      <circle cx="50" cy="10" r="4" fill="#F0C63A" className="animate-sparkle" />
      <circle cx="35" cy="55" r="2.5" fill="#E8735C" />
      <circle cx="65" cy="60" r="2.5" fill="#7EC8E3" />
      <circle cx="30" cy="90" r="2.5" fill="#F0C63A" />
      <circle cx="70" cy="95" r="2.5" fill="#E39FBB" />
    </svg>
  );
}

function GiftBoxes() {
  const gifts = [
    { top: "8%", left: "9%", color: "#E39FBB" },
    { top: "94%", left: "90%", color: "#7EC8E3" },
    { top: "50%", left: "3%", color: "#F0C63A" },
  ];
  return (
    <>
      {gifts.map((g, i) => (
        <span
          key={i}
          className="absolute text-2xl opacity-25"
          style={{ top: g.top, left: g.left }}
        >
          🎁
        </span>
      ))}
    </>
  );
}

function HolidayOverlay({ holiday }: { holiday: HolidayTheme }) {
  if (holiday.kind === "newyear") {
    return (
      <div className="season-layer">
        <ChristmasTree />
        <GiftBoxes />
        <SparkleLayer glyphs={["✨", "❄️", "⭐"]} count={10} color="text-amber-300" />
      </div>
    );
  }
  if (holiday.kind === "valentine") {
    return (
      <div className="season-layer">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-200/20 via-transparent to-transparent" />
        <FloatingLayer glyphs={["💗", "💕", "💖"]} count={12} />
      </div>
    );
  }
  // dini bayram (Ramazan / Kurban Bayramı)
  return (
    <div className="season-layer">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/25 via-transparent to-transparent" />
      <SparkleLayer glyphs={["🌙", "⭐", "✨"]} count={9} color="text-gold" />
    </div>
  );
}

/* ---------- şato ve mumlar ---------- */

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

function SingleCandle({ height, width, glow = true }: { height: string; width: string; glow?: boolean }) {
  return (
    <div className={`relative flex flex-col items-center drop-shadow-md ${width}`}>
      {/* Alev ve Sıcak Işık Halesi */}
      <div className="relative flex items-center justify-center">
        {glow && <div className="absolute w-8 h-8 rounded-full bg-amber-400/30 blur-md animate-pulse" />}
        <span className="w-3 h-5 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 animate-flicker" />
      </div>

      {/* Fitil */}
      <span className="w-0.5 h-1.5 bg-neutral-800 -mt-0.5 z-10" />

      {/* Mum Gövdesi */}
      <div className={`w-full ${height} bg-gradient-to-b from-[#fffcf7] via-[#fdf5e6] to-[#f3e7d4] rounded-t-lg rounded-b-md border border-amber-900/10 shadow-md relative overflow-hidden`}>
        {/* Üst Erimiş Detay */}
        <div className="absolute top-0 inset-x-0 h-2 bg-amber-100/60 rounded-full blur-[1px]" />
      </div>
    </div>
  );
}

function Candle({ corner }: { corner: | "bl" | "br" }) {
  const posClass = {
    bl: "bottom-4 left-4",
    br: "bottom-4 right-4",
  }[corner];

  return (
    <div className={`absolute ${posClass} flex items-end -space-x-3 opacity-90 pointer-events-none z-10 scale-90 sm:scale-100`}>
      {/* 1. Sol Mum (Orta Boy Sütun) */}
      <div className="z-10">
        <SingleCandle height="h-20" width="w-8" />
      </div>

      {/* 2. Arka Mum (En Uzun Büyük Oda Mumu) */}
      <div className="z-0">
        <SingleCandle height="h-32" width="w-11" />
      </div>

      {/* 3. Ön Mum (Kısa & Tombul Mum) */}
      <div className="z-20 -mb-1">
        <SingleCandle height="h-14" width="w-10" />
      </div>

      {/* 4. En Sağdaki Küçük Gece Mumu */}
      <div className="z-30 -mb-2">
        <SingleCandle height="h-9" width="w-7" />
      </div>
    </div>
  );
}

interface Props {
  season: Season;
  holiday: HolidayTheme | null;
}

export default function BackgroundDecor({ season, holiday }: Props) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <CastleWatermark />
      <SeasonLayer season={season} />
      {holiday && <HolidayOverlay holiday={holiday} />}
      {DOODLES.map((spot, i) => (
        <Doodle key={i} spot={spot} />
      ))}
      <Candle corner="tl" />
      <Candle corner="tr" />
      <Candle corner="bl" />
      <Candle corner="br" />
    </div>
  );
}
