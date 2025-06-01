import {
  check,
  checkMultiple,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions'
import { Platform } from 'react-native'
import GeoLocation from 'react-native-geolocation-service'
import { isArray } from 'lodash'

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

export async function safeRequestPermissions(
  permissions: Permission[] | Permission,
): Promise<Nullable<Record<Permission, PermissionStatus>>> {
  try {
    if (!permissions) {
      return null
    }
    const permissionStatuses = await checkMultiple(
      isArray(permissions) ? permissions : [permissions],
    )
    const result = permissionStatuses
    const requestablePermissions = Object.keys(permissionStatuses).filter(
      permission => {
        return permissionStatuses[permission as Permission] === RESULTS.DENIED
      },
    ) as Permission[]

    const requestResult = await requestMultiple(requestablePermissions)

    for (const [permission, status] of Object.entries(requestResult)) {
      result[permission as Permission] = status
    }

    return result
  } catch (e) {
    return null
  }
}
