module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          1: '#FFC1A1',
        },
        brow_pod: {
          1: '#451800',
        },
      }
    },
  },
  plugins: [],
  purge:["./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
],
}
