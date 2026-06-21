/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0E14",
        surface: "#131826",
        surface2: "#1A2032",
        border: "#232B40",
        accent: "#7C5CFF",
        accent2: "#2DD4BF",
        warn: "#F59E0B",
        danger: "#FB7185",
        text: "#E8EAF0",
        muted: "#8B92A8",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,92,255,0.25), 0 8px 30px rgba(124,92,255,0.12)",
      },
    },
  },
  plugins: [],
};
