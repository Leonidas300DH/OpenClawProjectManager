/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#050505',
          dark: '#0a0a0f',
          glass: 'rgba(16, 16, 24, 0.6)',
          'glass-hover': 'rgba(25, 25, 35, 0.7)',
          white: '#eeeeee',
          gray: '#94a3b8',
          dim: '#475569',
          cyan: {
            DEFAULT: '#00f0ff',
            dim: 'rgba(0, 240, 255, 0.2)',
          },
          magenta: {
            DEFAULT: '#ff003c',
            dim: 'rgba(255, 0, 60, 0.2)',
          },
          yellow: '#fcee0a',
          green: '#00ff9f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cyan': '0 0 10px rgba(0, 240, 255, 0.5)',
        'magenta': '0 0 10px rgba(255, 0, 60, 0.5)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}