import { SupportedLanguages } from '@state/slices/settingsSlice.ts'
import { useAppSelector } from './redux.ts'

function useSelectedLanguage(): SupportedLanguages {
  return useAppSelector(state => state.settings.language)
}

export default useSelectedLanguage
