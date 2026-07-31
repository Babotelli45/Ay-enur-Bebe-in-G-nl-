"use client";

import { useRef, useState } from "react";
import { supabase, PHOTOS_BUCKET } from "@/lib/supabaseClient";

interface Props {
  url: string | null;
  pathPrefix: string; // örn: "2026-08-21/gun-1"
  onChange: (url: string | null) => void;
}

export default function PhotoFrame({ url, pathPrefix, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const filePath = `${pathPrefix}-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(PHOTOS_BUCKET)
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from(PHOTOS_BUCKET).getPublicUrl(filePath);
      onChange(data.publicUrl);
    } catch (err) {
      setError("Yükleme başarısız oldu, tekrar deneyin.");
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div
      className="relative w-full aspect-square rounded-xl border-2 border-dashed border-ink/40 bg-white/40 flex items-center justify-center overflow-hidden cursor-pointer group"
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {url ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="anı fotoğrafı" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            className="absolute top-1 right-1 bg-white/80 text-ink rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </>
      ) : uploading ? (
        <span className="text-xs font-label text-ink/60 animate-pulse">
          yükleniyor...
        </span>
      ) : (
        <span className="text-2xl text-ink/30">📷</span>
      )}
      {error && (
        <span className="absolute bottom-0 inset-x-0 text-[10px] text-red-600 bg-white/80 text-center">
          {error}
        </span>
      )}
    </div>
  );
}
