import { createTheme } from '@shopify/restyle'
import lightTheme, { Theme } from './light.ts' // Assuming this is your light theme

const darkPalette = {
  black: '#000000',
  white: '#FFFFFF',
  // Rich dark background with slight blue tint
  grayDark: '#121620',
  // Slightly lighter than background for cards and surfaces
  gray: '#1E2433',
  // For borders and dividers
  grayMedium: '#2A3142',
  // For muted text and icons
  grayLight: '#4D5566',
  // Vibrant blue for primary actions
  blue: '#4D9DE0',
  // Lighter blue for highlights and secondary elements
  blueLight: '#7FB8E6',
  // Darker blue for pressed states
  blueDark: '#2D6CA3',
  // Warm accent color for attention-grabbing elements
  orange: '#FF9F5A',
  // Darker orange for pressed states
  orangeDark: '#E67E33',
  // For error states and destructive actions
  red: '#FF5A5A',
  // For success states
  green: '#4CAF50',
  // For warning states
  yellow: '#FFC107',
  // For subtle highlights
  purple: '#9C7CF4',
}

const darkTheme: Theme = createTheme({
  ...lightTheme,
  colors: {
    background: darkPalette.grayDark,
    foreground: darkPalette.white,
    primary: darkPalette.blue,
    primaryLight: darkPalette.blueLight,
    secondary: darkPalette.orange,
    muted: darkPalette.grayLight,
    border: darkPalette.grayMedium,
    cardBackground: darkPalette.gray,
    danger: darkPalette.red,
    textSubdued: darkPalette.grayLight,
  },
})

export default darkTheme
