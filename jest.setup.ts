jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
)

jest.mock('react-native-geolocation-service', () => null)
