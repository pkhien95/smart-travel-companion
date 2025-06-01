import { Location } from '@rootTypes/places'

export const getDistance = (from: Location, to: Location): string => {
  // Earth radius in meters
  const earthRadius = 6371000

  // Convert latitude and longitude from degrees to radians
  const lat1 = (from.latitude * Math.PI) / 180
  const lon1 = (from.longitude * Math.PI) / 180
  const lat2 = (to.latitude * Math.PI) / 180
  const lon2 = (to.longitude * Math.PI) / 180

  // Haversine formula
  const dLat = lat2 - lat1
  const dLon = lon2 - lon1
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = earthRadius * c

  if (distance < 1000) {
    // If less than 1km, show in meters
    return `${Math.round(distance)}m away`
  } else {
    // Otherwise show in kilometers with one decimal place
    const distanceInKm = distance / 1000
    return `${distanceInKm.toFixed(1)} km away`
  }
}
