import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      colors: {
        gcp: {
          blue: '#4285F4',
          cyan: '#00E5FF',
          emerald: '#34A853',
          amber: '#FBBC05',
          red: '#EA4335',
        }
      }
    },
  },
  plugins: [typography],
};
