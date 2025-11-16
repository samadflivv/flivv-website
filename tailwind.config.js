// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backdropBlur: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
        '2xl': '30px',
        '3xl': '50px',
      },
    },
  },
  plugins: [],
}