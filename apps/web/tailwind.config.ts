import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        secondary: 'var(--secondary)',
        card: 'var(--card)',
        border: 'var(--border)',
        foreground: 'var(--text-primary)',
        muted: 'var(--text-secondary)',
        brand: {
          primary: 'var(--accent)',
          hover: 'var(--accent-hover)',
          brown: 'var(--brand-brown)',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, var(--accent-hover) 0%, var(--accent) 100%)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-poppins)', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(245, 115, 14, 0.4)',
        'glow-subtle': '0 0 10px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};
export default config;
