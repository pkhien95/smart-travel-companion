import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { useTheme } from '@shopify/restyle'
import { Theme } from '@theme/light.ts'
import { StyleSheet } from 'react-native'

export type ScreenBoxProps = SafeAreaViewProps & {
  enableHorizontalInset?: boolean
}

function ScreenBox({
  style,
  enableHorizontalInset = true,
  ...rest
}: ScreenBoxProps) {
  const { colors } = useTheme<Theme>()
  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[
        styles.container,
        { backgroundColor: colors.background },
        { paddingHorizontal: enableHorizontalInset ? 20 : 0 },
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ScreenBox
