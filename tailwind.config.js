/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"JetBrains Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'off-white': '#F7F7F5',
        'deep-charcoal': 'var(--neo-text)',
        'silver': '#C4C4C4',
        'neo-bg': 'var(--neo-bg)',
        'neo-surface': 'var(--neo-surface)',
        'neo-mint': '#99D2BF',
        'neo-blue': '#A3E2F3',
        'neo-pink': '#FFC4D0',
        'neo-orange': '#FFB37C',
        'neo-yellow': '#F5C518',
        border: "var(--neo-border)",
        input: "var(--neo-border)",
        ring: "var(--neo-border)",
        background: "var(--neo-bg)",
        foreground: "var(--neo-text)",
        primary: {
          DEFAULT: "var(--neo-text)",
          foreground: "var(--neo-bg)",
        },
        secondary: {
          DEFAULT: "var(--neo-shadow)",
          foreground: "var(--neo-text)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "var(--neo-shadow)",
          foreground: "var(--neo-text)",
        },
        accent: {
          DEFAULT: "var(--neo-text)",
          foreground: "var(--neo-bg)",
        },
        popover: {
          DEFAULT: "var(--neo-surface)",
          foreground: "var(--neo-text)",
        },
        card: {
          DEFAULT: "var(--neo-surface)",
          foreground: "var(--neo-text)",
        },
        sidebar: {
          DEFAULT: "var(--neo-bg)",
          foreground: "var(--neo-text)",
          primary: "var(--neo-text)",
          "primary-foreground": "var(--neo-bg)",
          accent: "var(--neo-surface)",
          "accent-foreground": "var(--neo-text)",
          border: "var(--neo-border)",
          ring: "var(--neo-border)",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        neo: "4px 4px 0px var(--neo-shadow)",
        "neo-hover": "6px 6px 0px var(--neo-shadow)",
        "neo-silver": "4px 4px 0px #C4C4C4",
        "neo-sm": "2px 2px 0px var(--neo-shadow)",
        "neo-md": "4px 4px 0px var(--neo-shadow)",
        "neo-lg": "8px 8px 0px var(--neo-shadow)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "marquee": "marquee 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
