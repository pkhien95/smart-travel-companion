import { createText } from '@shopify/restyle'
import { Theme } from '@theme/light.ts'
import { TextProps as RNTextProps } from 'react-native'
import { ComponentProps } from 'react'

const Text = createText<Theme>()

export type TextProps = RNTextProps & ComponentProps<typeof Text>

export default Text
