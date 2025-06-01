export type Location = {
  latitude: number
  longitude: number
}

export type Place = {
  id: string
  location: Location
  name: string
  locationName: string
  notes: string[]
  photos: string[]
  isFavorite: boolean
  openingHours: string[]
  rating: number
}
