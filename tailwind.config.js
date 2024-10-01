const options = require("./config");

const allPlugins = {
  typography: require("@tailwindcss/typography"),
  forms: require("@tailwindcss/forms"),
  containerQueries: require("@tailwindcss/container-queries"),
};

const plugins = Object.keys(allPlugins)
  .filter((k) => options.plugins[k])
  .map((k) => {
    if (k in options.plugins && options.plugins[k]) {
      return allPlugins[k];
    }
  });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  darkMode: 'childmode',
  theme: {
    screens: {
      md: "768px",
      xl: "1366px",
    },
    fontSize: {
        butsemi: [
          '18px',
          {
            fontWeight: "600",
            lineHeight: "21px",
            letterSpacing: "0.02em",
          }
        ],
        but14r: [
          '14px',
          {
            fontWeight: "400",
            lineHeight: "20px",
            letterSpacing: "normal",
          }
        ],
        but14m: [
          '14px',
          {
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "normal",
          }
        ],
        but16r: [
          '16px',
          {
            fontWeight: "400",
            lineHeight: "26px",
            letterSpacing: "normal",
          }
        ],
        but16m: [
          '16px',
          {
            fontWeight: "500",
            lineHeight: "26px",
            letterSpacing: "normal",
          }
        ],
        but18r: [
          '18px',
          {
            fontWeight: "400",
            lineHeight: "21px",
            letterSpacing: "0.01em",
          }
        ],
        but18m: [
          '18px',
          {
            fontWeight: "500",
            lineHeight: "21px",
            letterSpacing: "0.01em",
          }
        ],
        tag20m: [
          '20px',
          {
            fontWeight: "500",
            lineHeight: "23px",
            letterSpacing: "0.02em",
          }
        ],
        body1: [
          '18px',
          {
            fontWeight: "400",
            lineHeight: "29px",
            letterSpacing: "normal",
          }
        ],
        body2: [
          '16px',
          {
            fontWeight: "600",
            lineHeight: "26px",
            letterSpacing: "normal",
          }
        ],
        body3: [
          '16px',
          {
            fontWeight: "400",
            lineHeight: "26px",
            letterSpacing: "normal",
          }
        ],
        body4: [
          '14px',
          {
            fontWeight: "400",
            lineHeight: "21px",
            letterSpacing: "normal",
          }
        ],
        deskh1: [
          '40px',
          {
            fontWeight: "700",
            lineHeight: "46px",
            letterSpacing: "0.03em",
          }
        ],
        deskh2: [
          '30px',
          {
            fontWeight: "700",
            lineHeight: "33px",
            letterSpacing: "0.02em",
          }
        ],
        deskh3: [
          '26px',
          {
            fontWeight: "600",
            lineHeight: "30px",
            letterSpacing: "0.02em",
          }
        ],
        deskh4: [
          '24px',
          {
            fontWeight: "600",
            lineHeight: "28px",
            letterSpacing: "0.02em",
          }
        ],
        deskSubtitle: [
          '20px',
          {
            fontWeight: "600",
            lineHeight: "23px",
            letterSpacing: "0.02em",
          }
        ],
        deskSubtitle2: [
          '16px',
          {
            fontWeight: "600",
            lineHeight: "19px",
            letterSpacing: "normal",
          }
        ],
        mobSubtitle: [
          '16px',
          {
            fontWeight: "600",
            lineHeight: "18px",
            letterSpacing: "0.02em",
          }
        ],
        mobh1: [
          '24px',
          {
            fontWeight: "700",
            lineHeight: "29px",
            letterSpacing: "0.02em",
          }
        ],
        mobh2: [
          '20px',
          {
            fontWeight: "600",
            lineHeight: "24px",
            letterSpacing: "0.02em",
          }
        ],
        mobh3: [
          '18px',
          {
            fontWeight: "600",
            lineHeight: "21px",
            letterSpacing: "0.02em",
          }
        ],
        compTab10R: [
          '10px',
          {
            fontWeight: "500",
            lineHeight: "11px",
            letterSpacing: "0.02em",
          }
        ],
    },
    colors: {
      inherit: 'inherit',
      trans: 'transparent',
      black: '#000000',
      mcg: {
        pg: '#005055',
        lg: '#13878F',
        bs: '#EAF3F4',
        b: '#F7FBFB',
        dba: '#F4F1EE'
      },
      mck: {
        pb: '#0096C6',
        lg: '#38C6F4',
        bs: '#DCF7FF',
        ba: '#E3F8FF',
        bb: '#F0FBFF',
        bp: '#FFF8FA',
        pa: '#FFEFF3'
      },
      el: {
        err: '#E51111',
        slider: 'rgba(255, 255, 255, 0.8)',
        dg: '#DBDBDB',
        lg: '#DFDFDF',
        it: '#797979',
        ia: '#858585',
        ih: '#3C3C3C'
      },
      text: {
        th: '#0A0A0A',
        d: '#1E1E1E',
        at: '#939393'
      },
      bg: {
        white: '#FFFFFF',
        beige: '#FAFAFA'
      }
    },
    boxShadow: {
      '2': '0 0 30px 0 rgba(237, 237, 237, 0.7)',
      '3': '0 0 30px 0 rgba(116, 116, 116, 0.7)',
      '4': '0 0 30px 0 #d6d6d6',
      '5': '0 0 30px 0 #d6d6d6',
    }, 
    container: {
      center: true,
      width: {
        DEFAULT: "100%",
        md: "768px",
        xl: "1366px",
      },
      padding: {
        DEFAULT: "12px",
        md: "27px",
        xl: "63px",
      },
    },

    extend: {
      height: {
        screen: "var(--doc-height, 100vh)",
      },
    },
  },
  plugins: plugins,
};
