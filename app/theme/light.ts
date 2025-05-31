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
    cardBackground: palette.white,
    danger: palette.red,
    textSubdued: palette.grayDark,
  },
  spacing: {
    0: 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    '2xl': 40,
    '20': 20,
    '12': 12,
  },
  borderRadii: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    circle: 9999,
  },
  buttonVariants: {
    defaults: {
      paddingVertical: '12',
      paddingHorizontal: 'm',
      borderRadius: 'm',
      flexDirection: 'row',
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
      fontFamily: 'Inter-SemiBold',
      fontSize: 18,
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
    note: {
      fontFamily: 'Inter-Italic',
      fontSize: 16,
      fontStyle: 'italic',
    },
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
})

export type Theme = typeof lightTheme
export default lightTheme
