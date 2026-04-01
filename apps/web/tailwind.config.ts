import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        fog: "var(--fog)",
        line: "var(--line)",
        brand: {
          DEFAULT: "var(--brand)",
          dark: "var(--brand-dark)",
          warm: "var(--brand-warm)",
        },
        canvas: "var(--canvas)",
        panel: "var(--panel)",
        muted: "var(--muted)",
        success: "var(--success)",
        warning: "var(--warning)",
      },
      boxShadow: {
        panel: "0 20px 60px rgba(15, 23, 42, 0.10)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(250, 204, 21, 0.30), transparent 30%), radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.22), transparent 22%), linear-gradient(135deg, rgba(254, 249, 195, 0.85), rgba(255, 255, 255, 0.95))",
      },
    },
  },
  plugins: [],
};
export default config;
