"use client";

interface Props {
  value: number; // 0-5
  onChange: (v: number) => void;
}

export default function BurnTracker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => onChange(i === value ? i - 1 : i)}
            aria-label={`kalori yakım ateşi ${i}`}
            aria-pressed={i <= value}
            className="transition-transform hover:scale-110 active:scale-95"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ates.png"
              alt=""
              className={`w-6 h-6 object-contain mix-blend-multiply transition-opacity ${
                i <= value ? "opacity-100" : "opacity-30"
              }`}
            />
          </button>
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
