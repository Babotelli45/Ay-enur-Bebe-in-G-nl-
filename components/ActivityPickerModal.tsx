"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  className = "w-12 h-12",
  emojiClassName = "text-3xl",
}: {
  cat: ActivityCategory;
  className?: string;
  emojiClassName?: string;
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
  return <span className={emojiClassName}>{cat.emoji}</span>;
}

export default function ActivityPickerModal({ onClose, onConfirm }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [category, setCategory] = useState<ActivityCategory | null>(null);
  const [pendingLabel, setPendingLabel] = useState<string>("");
  const [customText, setCustomText] = useState("");
  const [mounted, setMounted] = useState(false);

  // Portal, sadece client'ta (document mevcutken) kullanılabilir
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-[#fffdfa] dark:bg-paper rounded-3xl p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="kapat"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-ink/5 hover:bg-ink/15 text-ink/60 hover:text-ink text-lg transition-colors"
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
                  <CategoryIcon cat={cat} className="w-12 h-12" emojiClassName="text-3xl" />
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
              <CategoryIcon cat={category} className="w-8 h-8" emojiClassName="text-2xl" />
              {category.label}
            </h3>
            <div className="flex flex-col gap-2">
              {category.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => pickSub(opt)}
                  className="bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 rounded-lg py-2 px-3 text-left font-label text-ink border border-ink/10 flex items-center gap-2"
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
                    className="flex-1 rounded-lg px-3 py-2 bg-white/70 dark:bg-white/5 border border-ink/10 font-label text-sm text-ink outline-none"
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

  // Modal, rotate-1 gibi transform içeren üst bileşenlerin "containing block"
  // sorunundan tamamen kaçınmak için doğrudan document.body'e portallanır.
  if (!mounted) return null;
  return createPortal(modalContent, document.body);
}
