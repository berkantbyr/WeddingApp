/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C75B7A',
        secondary: '#E08997',
        accent: '#FCE8EF',
        dark: '#2F1B25',
        muted: '#7A5360',
        light: '#FFF6F8'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Poppins"', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(199, 91, 122, 0.35)'
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(135deg, rgba(199, 91, 122, 0.9), rgba(247, 183, 195, 0.85))'
      }
    }
  },
  plugins: []
};

