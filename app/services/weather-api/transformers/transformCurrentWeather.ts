import { get } from 'lodash'
import { CurrentWeatherResponse } from '../types.ts'

export const transformCurrentWeather = (
  rawData: unknown,
): CurrentWeatherResponse => {
  const name = get(rawData, 'name', '')
  const description = get(rawData, 'weather.[0].description')
  const icon = get(rawData, 'weather.[0].icon')

  return {
    name,
    description,
    icon: icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : undefined,
  }
}
