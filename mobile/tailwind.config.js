/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#141414',
        'surface-elevated': '#1E1E1E',
        'surface-hover': '#282828',
        'border-default': '#2A2A2A',
        'border-strong': '#3A3A3A',
        'text-primary': '#F5F5F5',
        'text-secondary': '#A0A0A0',
        'text-tertiary': '#666666',
        'text-disabled': '#4A4A4A',
        'text-inverse': '#0A0A0A',
        accent: '#FF6B2C',
        'accent-hover': '#E55A1F',
        'accent-subtle': 'rgba(255, 107, 44, 0.1)',
        'accent-text': '#FF8A5C',
        success: '#34C759',
        'success-subtle': 'rgba(52, 199, 89, 0.1)',
        warning: '#FFD60A',
        'warning-subtle': 'rgba(255, 214, 10, 0.1)',
        error: '#FF3B30',
        'error-subtle': 'rgba(255, 59, 48, 0.1)',
        info: '#5AC8FA',
        'info-subtle': 'rgba(90, 200, 250, 0.1)',
      },
      fontFamily: {
        'poppins': ['Poppins_400Regular'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-semibold': ['Poppins_600SemiBold'],
        'poppins-bold': ['Poppins_700Bold'],
      },
    },
  },
  plugins: [],
};