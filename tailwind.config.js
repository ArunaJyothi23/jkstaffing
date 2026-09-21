/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'calc(var(--radius) + 0.25rem)',
        xl: 'calc(var(--radius) + 0.5rem)',
        '2xl': 'calc(var(--radius) + 1rem)',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(13, 35, 83, 0.08)',
        'card-hover': '0 12px 40px rgba(13, 35, 83, 0.14)',
        'accent': '0 8px 24px rgba(232, 146, 42, 0.35)',
        'nav': '0 2px 24px rgba(13, 35, 83, 0.1)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0D2353 0%, #1A4B9E 50%, #0D2353 100%)',
        'gold-gradient': 'linear-gradient(135deg, #E8922A 0%, #F5A832 100%)',
        'blue-gold': 'linear-gradient(135deg, #0D2353, #1A4B9E, #E8922A)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};