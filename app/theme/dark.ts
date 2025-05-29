import { createTheme } from '@shopify/restyle'
import lightTheme from './light.ts' // Assuming this is your light theme

const darkPalette = {
  black: '#000000',
  white: '#FFFFFF',
  grayDark: '#121212',
  gray: '#2C2C2E',
  grayLight: '#3A3A3C',
  blue: '#1D7DEA',
  blueLight: '#3B8CFF',
  orange: '#FF7F50',
  red: '#FF4C4C',
}

const darkTheme = createTheme({
  ...lightTheme,
  colors: {
    background: darkPalette.grayDark,
    foreground: darkPalette.white,
    primary: darkPalette.blue,
    primaryLight: darkPalette.blueLight,
    secondary: darkPalette.orange,
    muted: darkPalette.grayLight,
    border: darkPalette.gray,
    cardBackground: darkPalette.gray,
    danger: darkPalette.red,
  },
})

export type DarkTheme = typeof darkTheme
export default darkTheme
