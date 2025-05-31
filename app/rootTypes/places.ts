export type Location = {
  lat: number
  lng: number
}

export type Place = {
  id: string
  location: Location
  name: string
  locationName: string
  notes: string[]
  photos: string[]
  isFavorite: boolean
}
