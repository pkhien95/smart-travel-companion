import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CurrentWeatherResponse } from './types.ts'
import { Location } from '@rootTypes/places.ts'
import { transformCurrentWeather } from './transformers/transformCurrentWeather.ts'
import Config from 'react-native-config'

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  }),
  endpoints: build => ({
    getCurrentWeather: build.query<CurrentWeatherResponse, Location>({
      query: ({ latitude, longitude }) => ({
        url: '/weather',
        params: {
          lat: latitude,
          lon: longitude,
          units: 'metric',
          appId: Config.WEATHER_API_KEY,
        },
      }),
      transformResponse: transformCurrentWeather,
    }),
  }),
})

export const { useGetCurrentWeatherQuery } = weatherApi
