import { useEffect, useState } from 'react'
import { requestLocationPermission } from '@utils/permissions.ts'
import GeoLocation, { GeoPosition } from 'react-native-geolocation-service'

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
