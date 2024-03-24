/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        black: "#2b303b",
        base00: "#2b303b",
        base01: "#343d46",
        base02: "#4f5b66",
        base03: "#65737e",
        base04: "#a7adba",
        base05: "#c0c5ce",
        base06: "#dfe1e8",
        white: "#eff1f5",
        base07: "#eff1f5",
        base08: "#bf616a",
        base09: "#d08770",
        base0A: "#ebcb8b",
        base0B: "#a3be8c",
        base0C: "#96b5b4",
        base0D: "#8fa1b3",
        pink: "#b48ead",
        base0E: "#b48ead",
        brown: "#ab7967",
        base0F: "#ab7967",
      },
      height: {
        "20vh": "20vh",
      },
      width: {
        "20vh": "20vh",
      },
    },
  },
  plugins: [],
};
