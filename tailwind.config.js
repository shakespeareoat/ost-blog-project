/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#008080",
          100: "#008080",
          200: "#007A7A",
          300: "#007070",
          400: "#006666",
          500: "#006161",
          600: "#005C5C",
          700: "#004D4D",
          800: "#004242",
          900: "#002E2E",
        },
      },
    },
  },
};
