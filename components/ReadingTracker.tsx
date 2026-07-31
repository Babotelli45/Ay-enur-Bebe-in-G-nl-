"use client";

interface Props {
  value: number; // 0-5 arası okuma seviyesi
  onChange: (v: number) => void;
}

export default function ReadingTracker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-label text-ink/70 mr-1">📖 Okuma</span>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i === value ? i - 1 : i)}
          className="p-0.5 focus:outline-none transition-transform hover:scale-110 active:scale-95"
          title={`${i} Saat Okuma`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={i <= value ? "#A78BFA" : "none"}
            stroke="#3D322C"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-all duration-200 ${
              i <= value
                ? "opacity-100 drop-shadow-[0_2px_4px_rgba(167,139,250,0.4)]"
                : "opacity-40 hover:opacity-70"
            }`}
          >
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </button>
      ))}
    </div>
  );
}
