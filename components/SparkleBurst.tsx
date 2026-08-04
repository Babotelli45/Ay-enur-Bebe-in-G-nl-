"use client";

const PARTICLE_COUNT = 10;
const GLYPHS = ["✨", "⭐", "💫"];

interface Props {
  /** parçacıkların ne kadar uzağa savrulacağı (px) */
  spread?: number;
}

export default function SparkleBurst({ spread = 30 }: Props) {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (i % 2 === 0 ? 0.15 : -0.15);
    const distance = spread + (i % 3) * 10;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    return {
      tx,
      ty,
      glyph: GLYPHS[i % GLYPHS.length],
      delay: (i % 4) * 0.05,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-visible" aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 text-sm animate-burst"
          style={
            {
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties
          }
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}
