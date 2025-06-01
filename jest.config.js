module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-permissions|react-native-calendar-events|react-native-device-info|react-native-geolocation-service)/)',
  ],
  setupFiles: ['<rootDir>/jest.setup.ts'],
}
