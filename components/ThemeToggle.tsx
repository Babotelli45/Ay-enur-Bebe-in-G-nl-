"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "aysenur-theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // app/layout.tsx içindeki inline script sayfa boyanmadan önce 'dark' sınıfını
    // zaten uygulamış olabilir; burada sadece o gerçek duruma senkronize oluyoruz.
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch (e) {
      // localStorage kullanılamıyorsa sessizce yoksay
    }
  }

  if (!mounted) {
    // Hydration uyuşmazlığını önlemek için aynı boyutta boş bir yer tutucu
    return <div className="w-9 h-9" aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Gündüz moduna geç" : "Gece moduna geç"}
      title={dark ? "Gündüz moduna geç" : "Gece moduna geç"}
      className="w-9 h-9 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-base shadow-sm transition-colors dark:bg-white/10 dark:hover:bg-white/20"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
