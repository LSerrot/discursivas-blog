/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',       // --bg-black
          dark: '#050505',        // --bg-dark-gray
          card: '#111111',        // --bg-card
          orange: '#E07720',      // --neon-orange
          purple: '#9579D4',      // --neon-purple
          gray: '#B0B0B0',        // --text-gray
          white: '#FFFFFF',       // --text-white
        }
      },
      fontFamily: {
        display: ['"Exo 2"', 'sans-serif'], // Fonte de Títulos
        body: ['"Poppins"', 'sans-serif'],   // Fonte de Texto
      },
      boxShadow: {
        'glow-orange': '0 0 30px rgba(224, 119, 32, 0.3)',
        'glow-purple': '0 0 30px rgba(149, 121, 212, 0.3)',
      },
      animation: {
        'orb-float': 'orb-float 12s ease-in-out infinite',
        'pulse-neon': 'neon-pulse 2s infinite',
      },
      keyframes: {
        'orb-float': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.4' },
          '50%': { transform: 'translate(40px, -40px) scale(1.2)', opacity: '0.6' },
        },
        'neon-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px #E07720' },
          '50%': { boxShadow: '0 0 25px #E07720, 0 0 10px #9579D4' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}