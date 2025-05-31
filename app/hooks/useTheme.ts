import { useTheme as useRestyleTheme } from '@shopify/restyle'
import { Theme } from '@theme/light.ts'

const useTheme = () => {
  return useRestyleTheme<Theme>()
}

export default useTheme
