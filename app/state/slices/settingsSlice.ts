import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SupportedLanguages = 'en' | 'vi'

export enum SupportedTheme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

type State = {
  theme: SupportedTheme
  language: SupportedLanguages
}

const initialState: State = {
  theme: SupportedTheme.LIGHT,
  language: 'en',
}

export const settingsSLice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<SupportedLanguages>) => {
      state.language = action.payload
    },
    setTheme: (state, action: PayloadAction<SupportedTheme>) => {
      state.theme = action.payload
    },
  },
})

export const { setLanguage, setTheme } = settingsSLice.actions

const settingsReducer = settingsSLice.reducer

export default settingsReducer
