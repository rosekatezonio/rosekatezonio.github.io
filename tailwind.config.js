
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: ["hover:text-neutral-400", "hover:text-slate-600"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        paper: "#FFFFFF",
        accent: {
          300: "rgb(var(--accent-300) / <alpha-value>)",
          400: "rgb(var(--accent-400) / <alpha-value>)",
          500: "#171717",
          600: "#000000",
        },
        onaccent: "rgb(var(--on-accent) / <alpha-value>)",
        slate: {
          50: "#F7F7F7", 100: "#EFEFEF", 200: "#E0E0E0", 300: "#CCCCCC", 400: "#8A8A8A",
          500: "#666666", 600: "#4A4A4A", 700: "#333333", 800: "#1F1F1F", 900: "#000000", 950: "#000000",
        },
        neutral: {
          50: "#FFFFFF", 100: "#F5F5F5", 200: "#E0E0E0", 300: "#C2C2C2", 400: "#A0A0A0",
          500: "#7A7A7A", 600: "#555555", 700: "#3A3A3A", 800: "#262626", 900: "#121212", 950: "#000000",
        },
      },
    },
  },
  plugins: [],
};
