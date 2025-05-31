import {
  request,
  Permission,
  check,
  RESULTS,
  PERMISSIONS,
} from 'react-native-permissions'
import { Platform } from 'react-native'
import GeoLocation from 'react-native-geolocation-service'

export const requestPermission = async (permission: Permission) => {
  const checkResult = await check(permission)

  if (checkResult === RESULTS.UNAVAILABLE) {
    return false
  }

  if (checkResult === RESULTS.GRANTED || checkResult === RESULTS.LIMITED) {
    return true
  }

  if (checkResult === RESULTS.BLOCKED) {
    return false
  }

  if (checkResult === RESULTS.DENIED && Platform.OS === 'ios') {
    return false
  }

  const requestResult = await request(permission)

  if (requestResult === RESULTS.GRANTED || requestResult === RESULTS.LIMITED) {
    return true
  }

  return false
}

export const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const authorizationResult = await GeoLocation.requestAuthorization(
      'whenInUse',
    )
    return authorizationResult === 'granted'
  }

  return requestPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
}
