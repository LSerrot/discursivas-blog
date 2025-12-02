/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Cores extraídas do PDF Discursivas
        brand: {
          dark: '#0F0231',    // Azul Científico (Fundo Principal)
          orange: '#E07720',  // Laranja Estímulo (Destaques/Botões)
          sand: '#F4E3D1',    // Areia Analógica (Texto suave/Detalhes)
          lilac: '#9579D4',   // Lilás Criterioso (Detalhes secundários)
          black: '#000000',   // Preto Manifesto
          white: '#FFFFFF',   // Branco Base
        }
      },
      fontFamily: {
        // Fontes definidas no Brand Kit
        sans: ['Poppins', 'sans-serif'],
        display: ['"Exo 2"', 'sans-serif'],
        hand: ['"Patrick Hand"', 'cursive'], // Para detalhes manuscritos
      },
      backgroundImage: {
        // Gradiente sutil baseado na identidade
        'brand-gradient': 'linear-gradient(to right, #0F0231, #1a0b45)',
        'accent-gradient': 'linear-gradient(135deg, #E07720 0%, #D06010 100%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}