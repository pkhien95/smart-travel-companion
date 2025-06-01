import { SupportedTheme } from '@state/slices/settingsSlice.ts'

export const THEMES: Record<SupportedTheme, string> = {
  [SupportedTheme.LIGHT]: 'Light',
  [SupportedTheme.DARK]: 'Dark',
  [SupportedTheme.SYSTEM]: 'System',
}
