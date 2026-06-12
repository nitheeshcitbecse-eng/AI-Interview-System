/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#00d4ff',
          600: '#00b8d4',
          900: '#0f172a'
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(131, 56, 236, 0.5)',
        'glow-pink': '0 0 20px rgba(255, 0, 110, 0.5)'
      }
    }
  },
  plugins: []
};
