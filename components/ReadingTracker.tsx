"use client";

interface Props {
  value: number; // 0-5 arası saat
  onChange: (v: number) => void;
}

export default function ReadingTracker({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-0.5 my-1.5">
      <div className="flex items-center gap-1 text-xs">
        <span>📖</span>
        <span className="font-medium text-neutral-600">Okuma</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-lg">
          {[1, 2, 3, 4, 5].map((hour) => (
            <button
              key={hour}
              type="button"
              onClick={() => onChange(hour === value ? hour - 1 : hour)}
              className={`transition-all duration-200 hover:scale-125 ${
                value >= hour
                  ? "opacity-100 scale-110 drop-shadow-sm"
                  : "opacity-30 grayscale hover:opacity-60"
              }`}
              title={`${hour} Saat Okuma`}
            >
              📖
            </button>
          ))}
        </div>
        <div className="flex justify-between w-full text-[9px] text-neutral-400 px-1 -mt-0.5 font-mono">
          <span>1 sa</span>
          <span>5 sa</span>
        </div>
      </div>
    </div>
  );
}
