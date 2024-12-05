import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        default: "var(--default)",
        contrast: "var(--contrast)",
        primary: "var(--primary)",
        "primary-bg": "var(--primary-bg)",
        secondary: "var(--secondary)",
        "secondary-bg": "var(--secondary-bg)",
      }
    },
  },
  plugins: [],
} satisfies Config;
