"use client";

import { useState } from "react";
import {
  ACTIVITY_CATEGORIES,
  ActivityCategory,
  weightedRandomActivity,
} from "@/lib/activities";

interface Props {
  onClose: () => void;
  onConfirm: (label: string) => void;
}

type Step = 1 | 2 | 3;

function CategoryIcon({
  cat,
  className = "w-10 h-10",
}: {
  cat: ActivityCategory;
  className?: string;
}) {
  const [broken, setBroken] = useState(false);
  if (cat.icon && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={cat.icon}
        alt=""
        onError={() => setBroken(true)}
        className={`${className} object-contain`}
      />
    );
  }
  return <span className="text-2xl">{cat.emoji}</span>;
}

export default function ActivityPickerModal({ onClose, onConfirm }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [category, setCategory] = useState<ActivityCategory | null>(null);
  const [pendingLabel, setPendingLabel] = useState<string>("");
  const [customText, setCustomText] = useState("");

  function pickCategory(cat: ActivityCategory) {
    setCategory(cat);
    setStep(2);
  }

  function pickSub(sub: string) {
    if (category?.id === "pembe" && sub === "Rastgele Seçim") {
      const r = weightedRandomActivity();
      setPendingLabel(`${r.main}: ${r.sub}`);
    } else {
      setPendingLabel(`${category?.label}: ${sub}`);
    }
    setStep(3);
  }

  function pickCustom() {
    if (!customText.trim()) return;
    setPendingLabel(`${category?.label}: ${customText.trim()}`);
    setStep(3);
  }

  function confirm() {
    onConfirm(pendingLabel);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="paper-texture ink-border shadow-page w-full max-w-sm rounded-2xl p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-ink/50 hover:text-ink text-lg"
          aria-label="kapat"
        >
          ✕
        </button>

        {step === 1 && (
          <>
            <h3 className="font-hand text-2xl text-ink mb-4 text-center">
              Bugün ne yapsak? 🌸
            </h3>
            {/* Simetrik 2x3 grid — 6 kategori de eşit boyutlu */}
            <div className="grid grid-cols-2 gap-3">
              {ACTIVITY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => pickCategory(cat)}
                  className={`aspect-square bg-gradient-to-br ${cat.bg} rounded-xl p-3 flex flex-col items-center justify-center gap-1 border border-ink/10 hover:scale-105 transition-transform`}
                >
                  <CategoryIcon cat={cat} className="w-10 h-10" />
                  <span className="font-label text-sm text-ink text-center leading-tight">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && category && (
          <>
            <button
              onClick={() => setStep(1)}
              className="text-xs font-label text-ink/50 mb-2"
            >
              ← geri
            </button>
            <h3 className="font-hand text-2xl text-ink mb-4 text-center flex items-center justify-center gap-2">
              <CategoryIcon cat={category} className="w-7 h-7" />
              {category.label}
            </h3>
            <div className="flex flex-col gap-2">
              {category.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => pickSub(opt)}
                  className="bg-white/70 hover:bg-white rounded-lg py-2 px-3 text-left font-label text-ink border border-ink/10 flex items-center gap-2"
                >
                  {opt === "Rastgele Seçim" ? (
                    <>
                      <span className="text-xl">🎲</span>
                      <span className="text-ink/60 text-xs">rastgele seçilsin</span>
                    </>
                  ) : (
                    opt
                  )}
                </button>
              ))}
              {category.allowCustom && (
                <div className="flex gap-2 mt-1">
                  <input
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        pickCustom();
                      }
                    }}
                    placeholder="kendi yazın..."
                    inputMode="text"
                    enterKeyHint="done"
                    className="flex-1 rounded-lg px-3 py-2 bg-white/70 border border-ink/10 font-label text-sm outline-none"
                  />
                  <button
                    onClick={pickCustom}
                    className="bg-blush hover:bg-blush-deep rounded-lg px-3 font-label text-sm text-ink"
                  >
                    Seç
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="font-label text-center text-ink text-base leading-relaxed mb-5">
              ahlaksız girişimlere maruz kalmanız kuvvetle muhtemel kabul ediyo
              musunuz?
            </p>
            <p className="text-center font-hand text-xl text-blush-deep mb-4">
              {pendingLabel}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={confirm}
                className="bg-blush-deep text-white rounded-full px-6 py-2 font-label hover:brightness-105"
              >
                Evet
              </button>
              <button
                onClick={confirm}
                className="bg-blush-deep text-white rounded-full px-6 py-2 font-label hover:brightness-105"
              >
                Evet
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
