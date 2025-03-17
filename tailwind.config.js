/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-delay-1': 'bounce 1s infinite -0.32s',
        'bounce-delay-2': 'bounce 1s infinite -0.16s',
        'cardAppear': 'cardAppear 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards'
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-25%)',
          },
        },
        cardAppear: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.8) translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          }
        }
      },
    },
  },
  plugins: [],
}