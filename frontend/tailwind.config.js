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
        gym: {
          bg: '#0A0D14',
          card: '#121722',
          surface: '#181F2E',
          border: '#222B3D',
          lime: '#CCFF00',
          limeHover: '#B3E600',
          amber: '#FF7A00',
          cyan: '#00E5FF',
          muted: '#8D98AA',
          text: '#F1F5F9'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Oswald', 'Montserrat', 'Impact', 'sans-serif'],
      },
      boxShadow: {
        'glow-lime': '0 0 25px -5px rgba(204, 255, 0, 0.4)',
        'glow-amber': '0 0 25px -5px rgba(255, 122, 0, 0.4)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
