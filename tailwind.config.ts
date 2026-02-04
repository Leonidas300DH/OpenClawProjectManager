import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberpunk: {
          background: '#0A0A1A',
          primary: '#00FFD1',
          secondary: '#FF00FF',
          accent: '#FF3366',
          text: '#E0E0FF',
          muted: '#4A4A6A'
        }
      },
      backgroundColor: {
        dark: {
          900: '#0A0A1A',
          800: '#121226',
          700: '#1A1A36'
        }
      },
      borderColor: {
        cyberpunk: {
          primary: '#00FFD1',
          secondary: '#FF00FF'
        }
      }
    },
  },
  plugins: [],
};
export default config;