/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090e',
          900: '#0c101a',
          850: '#111726',
          800: '#172033',
          750: '#1f2b45',
          700: '#273656',
          card: 'rgba(12, 16, 26, 0.78)',
          border: 'rgba(255, 255, 255, 0.09)',
          'border-bright': 'rgba(0, 230, 118, 0.35)',
        },
        brand: {
          green: '#00E676',
          'green-light': '#38ef98',
          'green-dark': '#00B359',
          'green-glow': 'rgba(0, 230, 118, 0.28)',
          cyan: '#00D8F6',
          'cyan-dark': '#0891B2',
          indigo: '#6366F1',
          'indigo-light': '#818CF8',
          purple: '#A855F7',
          amber: '#F59E0B',
          'amber-light': '#FBBF24'
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 25px rgba(0, 230, 118, 0.28)',
        'neon-cyan': '0 0 25px rgba(0, 216, 246, 0.28)',
        'neon-indigo': '0 0 25px rgba(99, 102, 241, 0.28)',
        'neon-amber': '0 0 25px rgba(245, 158, 11, 0.28)',
        'neon-lg': '0 0 45px rgba(0, 230, 118, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'float-delayed': 'float 5s ease-in-out 2.5s infinite',
        'aurora': 'aurora 15s ease infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.85, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
