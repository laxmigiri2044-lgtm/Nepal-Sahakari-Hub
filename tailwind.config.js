/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B4F72',
        'primary-light': '#2E86C1',
        accent: '#27AE60',
        bg: '#FFFFFF',
        'bg-soft': '#F8F9FA',
        text: '#1A1A2E',
        'text-muted': '#6C757D',
        border: '#E9ECEF',
        danger: '#E74C3C',
        warning: '#F39C12',
      },
      fontFamily: {
        sans: ['Noto Sans Devanagari', 'Inter', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
    },
  },
  plugins: [],
}