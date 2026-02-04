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
        'cyberpunk-background': '#0A0A2A',
        'cyberpunk-text': '#E0E0FF',
        'cyberpunk-primary': '#00FFFF',
        'cyberpunk-secondary': '#FF00FF',
        'cyberpunk-muted': '#666699',
        'dark-800': '#1A1A4A',
      }
    },
  },
  plugins: [],
}