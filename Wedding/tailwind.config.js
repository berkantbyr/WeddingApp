/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8F3E97',
        secondary: '#F2A65A',
        accent: '#FFD7E5',
        dark: '#1F2933',
        muted: '#4A5568',
        light: '#F9FAFB'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Poppins"', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(143, 62, 151, 0.25)'
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(135deg, rgba(143, 62, 151, 0.8), rgba(242, 166, 90, 0.75))'
      }
    }
  },
  plugins: []
};

