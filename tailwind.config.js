/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#09090B",
          soft: "#111114",
        },
        ink: {
          DEFAULT: "#FFFFFF",
          muted: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#A855F7",
        },
        card: {
          purple: "#8054E8",
          lavender: "#B56CFF",
          orange: "#FF9D35",
          pink: "#F54B91",
          mint: "#69DDA8",
          yellow: "#FFD34E",
          coral: "#FF815A",
          teal: "#36C9B5",
          cream: "#F5E6C8",
          "dark-green": "#174D38",
          "royal-blue": "#2859A8",
          peach: "#FFB18B",
        },
      },
      fontFamily: {
        sans: ["var(--font-bricolage)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-unbounded)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        shell: "1400px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
