import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.ts'
import { weatherApi } from '@services/weather-api/weatherApi.ts'
import placesReducer from './slices/placesSlice.ts'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    places: placesReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(weatherApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
