module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary: deep water blue (used via existing blue-900 classes)
        blue: {
          900: "#0F4C75",
          800: "#145E8A",
        },
        // Brand secondary: fresh leaf / irrigation green
        brandGreen: {
          DEFAULT: "#22A06B",
          soft: "#2F9E44",
        },
        // Brand accent: warm sunlight yellow
        brandAccent: "#F2C94C",
        // Soft background option, if needed
        brandBg: "#F5F7FA",
      },
    },
  },
  plugins: [],
}
