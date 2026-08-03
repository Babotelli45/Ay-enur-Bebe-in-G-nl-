"use client";

interface Props {
  value: number; // 0-5
  onChange: (v: number) => void;
}

export default function CalorieIntakeTracker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i === value ? i - 1 : i)}
          aria-label={`kalori alım yıldızı ${i}`}
          aria-pressed={i <= value}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/yildiz.png"
            alt=""
            className={`w-6 h-6 object-contain mix-blend-multiply transition-opacity ${
              i <= value ? "opacity-100" : "opacity-30"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
