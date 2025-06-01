import { SupportedTheme } from '@state/slices/settingsSlice.ts'
import { useAppSelector } from './redux.ts'
import { useColorScheme } from 'react-native'
import { darkTheme, lightTheme } from '@theme'
import { Theme } from '@theme/light.ts'

const useSelectedTheme = (): Theme => {
  const { theme } = useAppSelector(state => state.settings)
  const systemTheme = useColorScheme()

  if (theme === SupportedTheme.SYSTEM) {
    return systemTheme === 'dark' ? darkTheme : lightTheme
  }

  return theme === SupportedTheme.DARK ? darkTheme : lightTheme
}

export default useSelectedTheme
