import { ViewProps } from '../base/View.tsx'
import { SafeAreaViewProps, SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@shopify/restyle'
import { Theme } from '@theme/light.ts'
import { StyleSheet } from 'react-native'

export type ScreenBoxProps = SafeAreaViewProps & {}

function ScreenBox(props: ScreenBoxProps) {
  const { colors } = useTheme<Theme>()
  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.container, { backgroundColor: colors.background }]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
})

export default ScreenBox
