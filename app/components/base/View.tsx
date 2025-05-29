import { createBox } from '@shopify/restyle'
import { Theme } from '@theme/light.ts'
import { View as RNView, ViewProps as RNViewProps } from 'react-native'
import { ComponentProps } from 'react'

const View = createBox<Theme>(RNView)

export type ViewProps = RNViewProps & ComponentProps<typeof View>

export default View
