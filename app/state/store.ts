import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.ts'
import { weatherApi } from '@services/weather-api/weatherApi.ts'
import placesReducer from './slices/placesSlice.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
import settingsReducer from './slices/settingsSlice.ts'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['places', 'settings'],
}

const rootReducer = combineReducers({
  auth: authReducer,
  places: placesReducer,
  settings: settingsReducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(weatherApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
