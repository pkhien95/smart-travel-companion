import { createTheme } from '@shopify/restyle'

const palette = {
  white: '#FFFFFF',
  black: '#000000',
  grayLight: '#F6F6F6',
  gray: '#D3D3D3',
  grayDark: '#808080',
  blueLight: '#E6F0FA',
  blue: '#1D7DEA',
  blueDark: '#104E8B',
  orange: '#FF7F50',
  red: '#FF4C4C',
}

const lightTheme = createTheme({
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.blue,
    primaryLight: palette.blueLight,
    secondary: palette.orange,
    muted: palette.gray,
    border: palette.gray,
    cardBackground: palette.grayLight,
    danger: palette.red,
  },
  spacing: {
    0: 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    '2xl': 40,
  },
  borderRadii: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
  },
  buttonVariants: {
    defaults: {
      paddingVertical: 'm',
      paddingHorizontal: 'l',
      borderRadius: 'm',
      alignItems: 'center',
      justifyContent: 'center',
    },
    primary: {
      backgroundColor: 'primary',
    },
    secondary: {
      backgroundColor: 'muted',
    },
  },
  textVariants: {
    defaults: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: 'foreground',
    },
    header: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
      color: 'foreground',
    },
    subheader: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
      color: 'foreground',
    },
    body: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: 'foreground',
    },
    label: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: 'muted',
    },
    button: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      color: 'foreground',
    },
    small: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: 'muted',
    },
    medium: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: 'foreground',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
})

export type Theme = typeof lightTheme
export default lightTheme
