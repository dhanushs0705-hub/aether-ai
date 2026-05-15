import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        neon: {
          cyan: '#00F5FF',
          purple: '#8B5CF6',
        },
        dark: {
          navy: '#0F172A',
        },
        light: {
          soft: '#E2E8F0',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'holographic': 'linear-gradient(135deg, rgba(0, 245, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)' },
          '50%': { opacity: '.5', boxShadow: '0 0 10px rgba(0, 245, 255, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
export default config
