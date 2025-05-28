module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          '@assets': './app/assets',
          '@components': './app/components',
          '@constants': './app/constants',
          '@features': './app/features',
          '@hooks': './app/hooks',
          '@navigation': './app/navigation',
          '@services': './app/services',
          '@state': './app/state',
          '@utils': './app/utils',
          '@localization': './app/localization',
          '@configs': './app/configs',
          '@rootTypes': './app/rootTypes',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
