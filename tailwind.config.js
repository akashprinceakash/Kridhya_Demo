/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wine: {
          950: '#1A050B',
          900: '#2B0912',
          800: '#45101F',
          700: '#5E182C',
          600: '#7A2238',
          500: '#93344B',
        },
        ivory: '#F1E6D3',
        cream: '#E7D6BC',
        sand: '#D8C19F',
        taupe: '#A89276',
        gold: {
          DEFAULT: '#C9A46A',
          light: '#E7D1A2',
          deep: '#8E6B36',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
        // sturdier serif for the Contact page: reads well in bold on light grounds
        contact: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      letterSpacing: { luxe: '0.32em' },
      maxWidth: { site: '1240px' },
      transitionTimingFunction: { luxe: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        fadeSlow: { from: { opacity: 0 }, to: { opacity: 1 } },
        spinReverse: { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
      },
      animation: {
        'fade-slow': 'fadeSlow 1s ease both',
        // slow ornamental rotation for mandala backgrounds
        'spin-slow': 'spin 120s linear infinite',
        'spin-slow-reverse': 'spinReverse 160s linear infinite',
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
}
