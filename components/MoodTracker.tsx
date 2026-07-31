"use client";

export const MOODS = [
  { id: "iyi", emoji: "😊", label: "İyi" },
  { id: "kotu", emoji: "☹️", label: "Kötü" },
  { id: "huysuz", emoji: "😤", label: "Huysuz" },
  { id: "yorgun", emoji: "😴", label: "Yorgun" },
  { id: "hasta", emoji: "🤒", label: "Hasta" },
] as const;

export type MoodId = (typeof MOODS)[number]["id"];

interface Props {
  value: MoodId | null;
  onChange: (v: MoodId | null) => void;
}

export default function MoodTracker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1.5">
      {MOODS.map((m) => (
        <button
          key={m.id}
          type="button"
          title={m.label}
          onClick={() => onChange(value === m.id ? null : m.id)}
          className={`text-lg rounded-full transition-all ${
            value === m.id
              ? "scale-125 drop-shadow-sm"
              : "opacity-40 grayscale hover:opacity-80 hover:grayscale-0"
          }`}
        >
          {m.emoji}
        </button>
      ))}
    </div>
  );
}
