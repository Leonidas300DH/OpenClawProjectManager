import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Extend the default Tailwind theme with our custom design tokens
      colors: {
        'cyber-black': '#050505',
        'cyber-dark': '#0a0a0f',
        'cyber-glass': 'rgba(16, 16, 24, 0.6)',
        'cyber-cyan': '#00f0ff',
        'cyber-magenta': '#ff003c',
        'cyber-yellow': '#fcee0a',
        'cyber-green': '#00ff9f',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 240, 255, 0.5)',
      },
      backdropBlur: {
        'cyber': '12px'
      }
    },
  },
  plugins: [],
}
export default config