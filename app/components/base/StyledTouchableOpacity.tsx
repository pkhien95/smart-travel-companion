import { createBox } from '@shopify/restyle'
import { Theme } from '@theme/light'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { ComponentProps } from 'react'
import { DEFAULT_HIT_SLOP } from '@constants/metrics'

const _StyledTouchableOpacity = createBox<Theme, TouchableOpacityProps>(
  TouchableOpacity,
)

export type StyledTouchableOpacityProps = ComponentProps<
  typeof _StyledTouchableOpacity
>

export const StyledTouchableOpacity = (props: StyledTouchableOpacityProps) => {
  return <_StyledTouchableOpacity hitSlop={DEFAULT_HIT_SLOP} {...props} />
}

export default StyledTouchableOpacity
