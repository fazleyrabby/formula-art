/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#08090d',
          secondary: '#0f111a',
          tertiary: '#161926',
          card: 'rgba(15, 17, 26, 0.75)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          active: 'rgba(56, 189, 248, 0.4)',
          hover: 'rgba(255, 255, 255, 0.2)',
        },
        accent: {
          cyan: '#38bdf8',
          indigo: '#818cf8',
          emerald: '#34d399',
          rose: '#f472b6',
          amber: '#fbbf24',
          violet: '#a78bfa',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(56, 189, 248, 0.15)',
        'glow-lg': '0 0 40px rgba(56, 189, 248, 0.25)',
        card: '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
