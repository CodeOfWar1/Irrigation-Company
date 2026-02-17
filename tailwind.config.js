module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary: deep water blue (matches logo blue tones)
        blue: {
          50: '#E6F2F8',
          100: '#CCE5F1',
          200: '#99CB E3',
          300: '#66B1D5',
          400: '#3397C7',
          500: '#1E7BA8',
          600: '#1A6B94',
          700: '#165B80',
          800: '#145E8A',
          900: '#0F4C75',
        },
        // Brand secondary: fresh irrigation green (matches logo green)
        green: {
          50: '#E8F5ED',
          100: '#D1EBDC',
          200: '#A3D7B9',
          300: '#75C396',
          400: '#47AF73',
          500: '#22A06B',
          600: '#1E8F5E',
          700: '#1A7E51',
          800: '#166D44',
          900: '#125C37',
        },
        // Brand accent: warm sunlight / earth tone
        accent: {
          DEFAULT: '#F2C94C',
          light: '#F5D675',
          dark: '#E6B83D',
        },
        // Neutral grays with slight blue tint
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
