/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

const conf = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {

        primary: "#334dff",
        primaryDark: "#c533ff",

        secondary: "#ff9c01",
        secondaryDark: "#ff9c01",

        black: "#000",
        grayish: "#c5c2c7",





        "brand-500-secondary": "#6B7280", // Example: Tailwind's gray-500
        "error-500": "#EF4444", // Example: Tailwind's red-500


        // new color theme

        fullBackgroungLight: "#F5F5F9",
        fullBackgroungDark: "#000",

        cardBgDark: "#1c212c",
        cardBgLight: "#ffffff",

        upperCardBgLight: "#f4f7ffd6",
        upperCardBgDark: "#303e4e",

        iconBgLight: "#ffffff",
        iconBgDark: "#384350",

        iconLight: "rgb(117 117 117) ",
        iconDark: "rgb(224 224 224)",

        formHeadingLight: "#21BBFD",
        formHeadingDark: "rgb(255 255 255)",


        sidebarActiveNavBackgroundLight: "rgb(117 117 117)",
        sidebarActiveNavBackgroundDark: "#19222C",

        activeNavItemDark: "#ffcd96",


        sideNavActiveBtnBgDark: "#AB30FC",



        sideNavActiveChildBgDark: "#AB30FC",

        sideNavActiveChildTextDark: "#e2b7ff",












        secondary: "#ff9c01",
        dark: '#2c2c2d',
        light: "#f8f9fb",
        mediumDark: "rgb(57 57 57)",
        lightButton: "rgb(23 53 81)",
        darkButton: "rgb(23 53 81)",

        formLabelLight: "rgb(0 0 0)",
        formLabelDark: "rgb(255 255 255)",



        white: "#ffffff",
        hambergerLight: "#b3ecf0",
        hambergerDark: "rgb(110 169 173 / 60%)",

        blueBorder: "#2196f3",
        orangeBorder: "#ff961de5",

        inputBgDark: "#313540",
        borderDark: "#ffa726",

        // sidebarHoverBgLight: ""



        // new ordered colors

        modelBodyBgLight: "#fff",
        modelBodyBgDark: "#303e4e",


        modelFooterBgLight: "#fafafa",
        modelFooterBgDark: "#262d36",






      },
      backgroundImage: {
        'custom-gradient-sidebar': "linear-gradient(to bottom, #9bf7ff, #077588, #00404b)",
        'custom-gradient-button-light': "linear-gradient(to bottom, #2b3839, #52adbc, #2b3839)",
        'custom-gradient-button-dark': "linear-gradient(to bottom, #8bf6ff, #000000, #8bf6ff)",
        'custom-gradient-header-light': "radial-gradient(circle, rgb(14 243 214) 0%, rgb(124 255 243) 23%, rgb(159 234 255) 100%)",
        'custom-gradient-bottom-light': "linear-gradient(to bottom, #025d64, #077588, #0c4853)",
        'custom-gradient-blue': "linear-gradient(to right, #6dd5ed, #2193b0)",
        'custom-gradient-bright-blue': "linear-gradient(90deg, rgba(33, 187, 253, 1) 0%, rgba(33, 187, 253, 1) 43%, rgba(43, 192, 255, 1) 100%)",
        'custom-gradient-bright-blue2': "linear-gradient(90deg, rgb(33 187 253) 0%, rgb(33 187 253) 43%, rgb(43 192 255) 100%)",
        'custom-gradient-grey-blue': "linear-gradient(90deg, rgb(103 135 149) 0%, rgb(138 167 180) 43%, rgb(170 198 210) 100%)",
        'custom-gradient-red': 'linear-gradient(90deg, #ff7e7e 0%, #b30000 100%)',
        'custom-gradient-green': 'linear-gradient(90deg, #a8e063 0%, #56ab2f 100%)',
        'custom-gradient-soft-blue': 'linear-gradient(to right, #5883ff, #3B82F6, #3d8ae1)',



      },

      boxShadow: {
        'custom-light': '0 0 .875rem 0 rgba(33,37,41,0.05)',
        'custom-deep': '0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)'
      },














    },
  },
  plugins: [],
});

export default conf;
