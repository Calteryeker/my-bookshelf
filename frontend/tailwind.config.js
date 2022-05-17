module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm_c' : '390px',
        'md_c' : '856px',
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
        lekton: ["Lekton", "sans-serif"],
        luck: ["Luckiest Guy", "cursive"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'section-logo-2': "url('/images/section2_fundo.png')",
        'signup-bg': "url('/images/bg_signup.png')",
      }
    },
  },
  plugins: [],
  purge:["./src/pages/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
],
}
