import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--primary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "#FFFFFF",
        },
        background: "var(--background)",
        surface: "var(--surface)",
        panel: "var(--panel)",
        border: "var(--border)",
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted)",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        glow: "0 0 0 1px color-mix(in srgb, var(--accent) 12%, transparent), 0 8px 24px color-mix(in srgb, var(--accent) 10%, transparent)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      maxWidth: {
        container: "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "drawer-in": {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "backdrop-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "drawer-in": "drawer-in 0.28s ease-out both",
        "backdrop-in": "backdrop-in 0.2s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
