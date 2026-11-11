/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dawn: '#1F2BB8', // ultramarine base
        ink: '#0E1470', // deep blue: losses, text on paper
        paper: '#F3F1FF', // off-white with a blue cast
        gold: '#FFC93C', // victory
        ember: '#FF6B5A', // warnings, unreachable
        haze: '#C9CCF5', // muted text on blue
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'Impact', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
