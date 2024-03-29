/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        dark: '#121826',
        blue: '#406AFF',
        gray: '#CED6E1',
        charcoal: '#364153',
      },
    },
  },
  plugins: [],
};
