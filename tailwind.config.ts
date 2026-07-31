import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F6EEDA",
        "paper-dark": "#EADFC2",
        blush: "#F4C9D9",
        "blush-deep": "#E39FBB",
        gold: "#CDA35B",
        lavender: "#CFC0E3",
        sky: "#8FCBE8",
        flame: "#E8735C",
        star: "#F0C63A",
        ink: "#5B4636",
      },
      fontFamily: {
        hand: ["var(--font-caveat)", "cursive"],
        label: ["var(--font-patrick)", "cursive"],
        body: ["var(--font-kalam)", "cursive"],
      },
      boxShadow: {
        page: "0 10px 40px rgba(91, 70, 54, 0.25)",
        spine: "inset 0 0 30px rgba(91, 70, 54, 0.15)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1", transform: "scaleY(1)" },
          "50%": { opacity: "0.75", transform: "scaleY(0.92)" },
        },
        fall: {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(180deg)", opacity: "0.2" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%": { transform: "translateY(105vh) translateX(0)", opacity: "0" },
          "10%": { opacity: "0.8" },
          "50%": { transform: "translateY(50vh) translateX(15px)" },
          "90%": { opacity: "0.8" },
          "100%": { transform: "translateY(-8vh) translateX(-10px)", opacity: "0" },
        },
      },
      animation: {
        flicker: "flicker 2.2s ease-in-out infinite",
        fall: "fall linear infinite",
        sparkle: "sparkle 3s ease-in-out infinite",
        float: "float linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
