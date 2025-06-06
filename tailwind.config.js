module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ['var(--font-the-seasons)', 'serif'],
        heading: ['var(--font-the-seasons)', 'serif'],
        subheading: ['var(--font-ovo)', 'serif'],
        body: ['var(--font-poppins)', 'sans-serif'],
      },
      keyframes: {
        fadeInTop: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-100px) rotateY(-30deg) rotateX(15deg) translateZ(100px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0) rotateY(-30deg) rotateX(15deg) translateZ(100px)'
          }
        },
        fadeInBottom: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(100px) rotateY(30deg) rotateX(15deg) translateZ(100px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0) rotateY(30deg) rotateX(15deg) translateZ(100px)'
          }
        }
      },
      animation: {
        'fadeInTop': 'fadeInTop 1s ease-out forwards',
        'fadeInBottom': 'fadeInBottom 1s ease-out forwards'
      }
    },
  },
  plugins: [],
}