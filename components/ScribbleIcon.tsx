"use client";

import { useId } from "react";

interface ScribbleIconProps {
  path: string;
  filled: boolean;
  color: string;
  glow?: boolean;
  size?: number;
  onClick: () => void;
  label: string;
}

export default function ScribbleIcon({
  path,
  filled,
  color,
  glow = false,
  size = 26,
  onClick,
  label,
}: ScribbleIconProps) {
  const rawId = useId();
  const clipId = `clip-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={filled}
      className="transition-transform hover:scale-110 active:scale-95"
      style={{
        filter: filled && glow ? `drop-shadow(0 0 4px ${color})` : undefined,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24">
        <defs>
          <clipPath id={clipId}>
            <path d={path} />
          </clipPath>
        </defs>
        <path
          d={path}
          fill="none"
          stroke="#5B4636"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {filled && (
          <g clipPath={`url(#${clipId})`} filter="url(#crayon-scribble)">
            <rect x="0" y="0" width="24" height="24" fill={color} opacity="0.9" />
            <path
              d="M2 5 L22 7 M2 10 L22 9 M2 14 L22 15 M2 18 L22 17"
              stroke={color}
              strokeWidth="2.4"
              opacity="0.5"
            />
          </g>
        )}
      </svg>
    </button>
  );
}
