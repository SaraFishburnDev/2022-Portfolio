/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    textOutline: {
      DEFAULT: '1px',
      0: '0px',
      2: '2px',
      4: '4px',
      8: '8px',
      ...colors
    },
    fontFamily: {
      "bst": ['Big Shoulders Text', 'cursive'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.cyan[600],
          dark: colors.cyan[500],
        }
      },
      keyframes: {
        twinkle: {
          '0%': { opacity: 1},
          '10%': { opacity: 0},
          '20%': { opacity: 1},
          '100%': { opacity: 1}
        }
      }
    },
  },
  plugins: [
    plugin(function({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-outline": (value) => {
            if ( value.match(/#|rgba?\(/) ) {
              return {
                "--text-outline-color": value
              }
            } else {
              value = value || '1px'

              return {
                textShadow: getTextOutline('var(--text-outline-color)', value)
              }
            }
          },
        },
        { values: flattenColorPalette(theme('textOutline')) }
      )
    })
  ],
}

const calcMaxSteps = (size) => size * 8

const getXValue = (step, maxSteps, size) => size * Math.sin((Math.PI * 2 * step) / maxSteps)
const getYValue = (step, maxSteps, size) => size * Math.cos((Math.PI * 2 * step) / maxSteps)

const getTextOutline  = (color, size) => {
  const matches = size.match(/(?<num>[0-9]+(\.[0-9]+)?)(?<unit>[a-zA-Z]+)/)
  if (!matches) {
    return 'unset'
  }

  const sizeUnit = matches.groups.unit
  size = matches.groups.num

  const maxSteps = 64

  let outlineString = ""
  Array(maxSteps).fill(null).forEach((_, i) => {
    const sringSegment = `${color} ${getXValue(i, maxSteps, size)}${sizeUnit} ${getYValue(i, maxSteps, size)}${sizeUnit} 0`
    outlineString += sringSegment
    if (i+1 == maxSteps) {
      outlineString += ";"
    } else {
      outlineString += ","
    }
  })

  return outlineString
}
