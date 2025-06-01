import { Text, View, ViewProps } from '@components'
import { DEFAULT_HIT_SLOP, WINDOW_WIDTH } from '@constants/metrics.ts'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import StyledTouchableOpacity from '../base/StyledTouchableOpacity.tsx'
import Icon from '@react-native-vector-icons/ionicons'
import { useNavigation } from '@react-navigation/native'

export type ScreenHeaderProps = Omit<ViewProps, 'children'> & {
  leftComponent?: React.ReactNode
  titleComponent?: string | React.ReactNode
  rightComponent?: React.ReactNode
  height?: number
  tintColor?: string
}

export const HEADER_HEIGHT = 44

const ScreenHeader = (props: ScreenHeaderProps) => {
  const {
    leftComponent,
    titleComponent,
    rightComponent,
    height = HEADER_HEIGHT,
    tintColor,
    ...rest
  } = props
  const { top: topInset } = useSafeAreaInsets()
  const navigation = useNavigation()

  return (
    <View
      width={WINDOW_WIDTH}
      style={{ paddingTop: topInset }}
      pointerEvents={'box-only'}
      {...rest}>
      <View height={height} flexDirection={'row'} alignItems={'center'}>
        {leftComponent ?? (
          <StyledTouchableOpacity
            px={'l'}
            hitSlop={DEFAULT_HIT_SLOP}
            onPress={navigation.goBack}>
            <Icon name={'chevron-back'} size={24} color={tintColor} />
          </StyledTouchableOpacity>
        )}
        <View flex={1} justifyContent={'center'}>
          {typeof titleComponent === 'string' ? (
            <Text variant={'subheader'} textAlign={'center'}>
              {titleComponent}
            </Text>
          ) : (
            titleComponent
          )}
        </View>
        {rightComponent ?? (
          <StyledTouchableOpacity opacity={0} disabled={true} px={'l'}>
            <Icon name={'chevron-back'} size={24} color={tintColor} />
          </StyledTouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default ScreenHeader
