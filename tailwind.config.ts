import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      backgroundImage: {
        gradation: 'linear-gradient(74deg, #51B7FF 15.54%, #5CE686 84.04%)'
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        bibinBlue: {
          10: '#F6FBFF',
          50: '#2196F3',
          100: '#51B7FF'
        },
        black: {
          base: 'black',
          10: 'rgba(0, 0, 0, 0.10)',
          20: 'rgba(0, 0, 0, 0.20)',
          30: 'rgba(0, 0, 0, 0.30)',
          50: 'rgba(0, 0, 0, 0.50)',
          70: 'rgba(0, 0, 0, 0.70)',
          80: 'rgba(0, 0, 0, 0.80)',
          90: 'rgba(0, 0, 0, 0.90)'
        },
        gray: {
          40: 'rgba(2, 34, 36, 0.4)'
        },
        white: {
          base: 'white',
          30: 'rgba(255, 255, 255, 0.30)'
        },
        text: {
          80: 'rgba(32, 34, 36, 0.80)',
          100: '#202224'
        },
        paleFrostBlue: '#F5F6FA',
        lightRed: '#FE735C',
        sunburstYellow: '#FCBE2D',
        powderBlue: '#EEF8FF',
        charcoalGray: '#6E6E73'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', ...fontFamily.sans]
      },
      boxShadow: {
        base: '0px 4px 10px 0px rgba(0, 0, 0, 0.03)'
      },
      height: {
        'screen-calc': 'calc(100vh - 370px)',
        'modal-screen-calc': 'calc(100vh - 80px)',
        'default-screen-calc': 'calc(100vh * 1.8)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;
