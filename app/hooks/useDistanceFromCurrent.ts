import { Location } from '@rootTypes/places.ts'
import useCurrentLocation from './useCurrentLocation.ts'
import { useMemo } from 'react'
import { getDistance } from '@utils/location.ts'

function useDistanceFromCurrent(location: Location): string | null {
  const currentLocation = useCurrentLocation()

  return useMemo(() => {
    if (currentLocation === null) {
      return null
    }

    const currentLocationCoord: Location = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    }

    return getDistance(currentLocationCoord, location)
  }, [currentLocation, location])
}

export default useDistanceFromCurrent
