// // tailwind.config.js
// module.exports = {
//   content: [
//     './pages/**/*.{js,jsx,ts,tsx}',
//     './components/**/*.{js,jsx,ts,tsx}',
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
      
//       backdropBlur: {
//         sm: '4px',
//         md: '8px',
//         lg: '12px',
//         xl: '20px',
//         '2xl': '30px',
//         '3xl': '50px',
//       },
//     },
//   },
//   plugins: [],
// }

// tailwind.config.js

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
      colors: {
        workshop: '#8B5CF6',
        lecture: '#3B82F6',
        meetup: '#10B981',
        conference: '#EF4444',
        sales: '#F59E0B',
      }
    },
  },
  plugins: [],
}