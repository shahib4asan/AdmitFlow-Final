/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Bebas Neue', 'cursive'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        ink: '#0a0f1e',
        paper: '#f5f3ee',
        cream: '#ede9e0',
        accent: '#1a3cff',
        danger: '#ff4d2e',
      },
    },
  },
  plugins: [],
}
