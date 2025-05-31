import { useEffect, useState } from 'react'
import {
  requestLocationPermission,
  requestPermission,
} from '@utils/permissions.ts'
import { PERMISSIONS } from 'react-native-permissions'
import { Platform } from 'react-native'
import GeoLocation, {
  GeoPosition,
  requestAuthorization,
} from 'react-native-geolocation-service'

function useCurrentLocation() {
  const [location, setLocation] = useState<GeoPosition | null>(null)

  useEffect(() => {
    async function init() {
      const permissionGranted = await requestLocationPermission()

      if (!permissionGranted) {
        return
      }

      GeoLocation.getCurrentPosition(
        position => {
          console.log('position', position)
          setLocation(position)
        },
        error => {
          console.error('getCurrentPosition', error)
        },
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 10000,
        },
      )
    }

    init()
  }, [])

  return location
}

export default useCurrentLocation
