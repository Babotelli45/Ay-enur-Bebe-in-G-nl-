"use client";

interface Props {
  value: number; // 0-5
  onChange: (v: number) => void;
}

export default function ReadingTracker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i === value ? i - 1 : i)}
          className="p-0.5 transition-opacity hover:opacity-80 focus:outline-none"
        >
          <img
            src="/icons/okuma.png"
            alt={`okuma ${i}`}
            className={`w-6 h-6 object-contain ${
              i <= value ? "opacity-100" : "opacity-30 grayscale"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
