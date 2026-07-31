"use client";

interface Props {
  value: number; // 0-5 arası saat
  onChange: (v: number) => void;
}

export default function ReadingTracker({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-0 my-0.5">
      {/* Yan Yana Hizalanmış Ana Satır */}
      <div className="flex items-center gap-1">
        <span className="text-xs font-label text-ink/70 mr-1 min-w-[52px]">📖 Okuma</span>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((hour) => (
            <button
              key={hour}
              type="button"
              onClick={() => onChange(hour === value ? hour - 1 : hour)}
              className={`text-sm leading-none transition-all duration-150 ${
                value >= hour
                  ? "opacity-100 scale-105 drop-shadow-sm"
                  : "opacity-30 grayscale hover:opacity-60"
              }`}
              title={`${hour} Saat Okuma`}
            >
              📖
            </button>
          ))}
        </div>
      </div>

      {/* Simgelerin Altındaki Minicik Saat Yazıları (Düzeni ve Satır Yüksekliğini Bozmaz) */}

  );
}
