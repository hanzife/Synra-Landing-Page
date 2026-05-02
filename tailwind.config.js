/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

import { colors, fonts, radius, shadows } from "./src/tokens/tokens.js"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:     colors.primary,
        primaryDark: colors.primaryDark,
        dark:        colors.dark,
        lightText:   colors.lightText,
        greyBg:      colors.greyBg,
      },
      fontFamily: {
        display: [fonts.display],
        body:    [fonts.body],
      },
      borderRadius: {
        sm: radius.sm,
        md: radius.md,
        lg: radius.lg,
        xl: radius.xl,
        full: radius.full,
      },
      boxShadow: {
        glass: shadows.glass,
        phone: shadows.phone,
        chip:  shadows.chip,
        card:  shadows.card,
      },
      backgroundImage: {
        "gradient-primary": `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
      },
    },
  },
  plugins: [],
}