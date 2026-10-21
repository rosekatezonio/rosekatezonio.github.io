
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: ["hover:text-red-400", "hover:text-red-600", "hover:text-slate-400", "hover:text-slate-600"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        paper: "#FFFFFF",
        onaccent: "rgb(var(--on-accent) / <alpha-value>)",
        red: {
          50: "#FAFAFA", 100: "#F5F5F5", 200: "#E5E5E5", 300: "rgb(var(--accent-300) / <alpha-value>)", 400: "rgb(var(--accent-400) / <alpha-value>)",
          500: "#171717", 600: "#000000", 700: "#0A0A0A", 800: "#171717", 900: "#262626", 950: "#000000",
        },
        amber: {
          50: "#F7F7F7", 100: "#EDEDED", 200: "#DCDCDC", 300: "#CDCDCD", 400: "#BFBFBF",
          500: "#595959", 600: "#404040", 700: "#333333", 800: "#262626", 900: "#1A1A1A", 950: "#0D0D0D",
        },
        blue: {
          50: "#F5F5F5", 100: "#EBEBEB", 200: "#D9D9D9", 300: "#B3B3B3", 400: "#8C8C8C",
          500: "#6B6B6B", 600: "#525252", 700: "#404040", 800: "#2E2E2E", 900: "#1F1F1F", 950: "#121212",
        },
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