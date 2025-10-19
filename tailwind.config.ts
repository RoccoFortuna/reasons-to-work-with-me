import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neonBlue: '#b1d7ff',
        neonPink: '#ffb1d7'
      },
      backgroundImage: {
        neonGradient: 'linear-gradient(135deg, #b1d7ff 0%, #ffb1d7 100%)',
      },
      boxShadow: {
        neon: '0 0 20px rgba(177,215,255,0.4), 0 0 40px rgba(255,177,215,0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
export default config
