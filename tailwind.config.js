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
          cyan: '#00f0ff',
          'cyan-dim': 'rgba(0, 240, 255, 0.2)',
          magenta: '#ff003c',
          'magenta-dim': 'rgba(255, 0, 60, 0.2)',
          yellow: '#fcee0a',
          green: '#00ff9f',
        },
        'cyberpunk-background': '#0A0A2A',
        'cyberpunk-text': '#E0E0FF',
        'cyberpunk-primary': '#00FFFF',
        'cyberpunk-secondary': '#FF00FF',
        'cyberpunk-muted': '#666699',
        'dark-800': '#1A1A4A',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cyan': '0 0 10px rgba(0, 240, 255, 0.5)',
        'magenta': '0 0 10px rgba(255, 0, 60, 0.5)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
