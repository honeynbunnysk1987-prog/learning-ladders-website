import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        royal: {
          DEFAULT: "#1E3A8A",
          50: "#EFF6FF",
          100: "#DBEAFE",
          400: "#3B5FC4",
          600: "#1E3A8A",
          700: "#172D6B",
          900: "#0F1E4D",
        },
        sunshine: {
          DEFAULT: "#FBBF24",
          100: "#FEF3C7",
          400: "#FBBF24",
          600: "#D69A0A",
        },
        leaf: {
          DEFAULT: "#16A34A",
          100: "#DCFCE7",
          400: "#22C55E",
          600: "#16A34A",
          700: "#116A34",
        },
        ink: "#0F1E4D",
      },
      fontFamily: {
        display: ["var(--font-baloo)", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        rung: "2rem 0.5rem 2rem 0.5rem",
        "rung-rev": "0.5rem 2rem 0.5rem 2rem",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(15, 30, 77, 0.15)",
        "soft-lg": "0 20px 60px -15px rgba(15, 30, 77, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
