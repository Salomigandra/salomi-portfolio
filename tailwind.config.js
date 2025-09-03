/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "header-soft":
          "linear-gradient(135deg, rgba(201,164,111,0.95) 0%, rgba(227,139,117,0.9) 25%, rgba(74,96,115,0.9) 60%, rgba(90,110,79,0.95) 100%)",
        "footer-soft":
          "linear-gradient(135deg, rgba(201,164,111,0.95) 0%, rgba(227,139,117,0.9) 25%, rgba(74,96,115,0.9) 60%, rgba(90,110,79,0.95) 100%)",
      },
      keyframes: {
        bgPan: {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 0%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
      },
      animation: {
        "bg-pan": "bgPan 18s linear infinite",
      },
    }
  },
  plugins: [],
};
