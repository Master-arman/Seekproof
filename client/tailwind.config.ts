import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        brand: {
          navy: {
            DEFAULT: '#0F1E2E',
            dark: '#0B1523',
            darkest: '#070E18',
            light: '#16283D',
            surface: '#1A2E44',
            border: '#223852',
          },
          gold: {
            DEFAULT: '#D4AF37',
            light: '#E0C068',
            dark: '#A88520',
            subtle: 'rgba(212, 175, 55, 0.12)',
          },
          slate: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          },
          light: {
            bg: '#F8FAFC',
            card: '#FFFFFF',
            border: '#E2E8F0',
            muted: '#64748B',
          },
          success: {
            DEFAULT: '#16803C',
            light: '#F0FDF4',
            border: '#BBF7D0',
          },
          error: {
            DEFAULT: '#B42318',
            light: '#FEF2F2',
            border: '#FECACA',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        DEFAULT: '0.25rem',
        none: '0px',
        xs: '0.125rem',
        xl: '0.375rem',
        '2xl': '0.5rem',
        '3xl': '0.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        'none': 'none',
        'soft': 'none',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': 'none',
        'card-hover': '0 1px 3px 0 rgba(0, 0, 0, 0.06)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out forwards',
        'pulse-subtle': 'pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
