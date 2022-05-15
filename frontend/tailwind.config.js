module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md_c' : '856px',
        'sm_c' : '390px',
      },
      colors: {
        romantic: {
          1: '#FFC1A1',
        },
        brow_pod: {
          1: '#451800',
        },
      },
      fontFamily: {
        luck: ["Luckiest Guy", "cursive"],
      },
    },
  },
  plugins: [],
  purge:["./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
],
}
