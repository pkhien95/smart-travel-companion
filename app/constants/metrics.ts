import { Dimensions } from 'react-native'

export const DEFAULT_HIT_SLOP = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
}

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get('window')
