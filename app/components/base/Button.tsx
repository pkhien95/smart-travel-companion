import React, { ComponentProps } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  color,
  composeRestyleFunctions,
  createRestyleComponent,
  createVariant,
  spacing,
  SpacingProps,
  useRestyle,
  VariantProps,
} from '@shopify/restyle'
import { Theme } from '@theme/light.ts'
import Text from './Text'

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  VariantProps<Theme, 'buttonVariants'>

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
  createVariant({ themeKey: 'buttonVariants' }),
])

export type ButtonProps = RestyleProps &
  ComponentProps<typeof TouchableOpacity> & {
    label?: string
  }

const Button = (props: ButtonProps) => {
  const { label, ...rest } = props
  const restyleProps = useRestyle(restyleFunctions, rest)

  return (
    <TouchableOpacity {...restyleProps}>
      <Text
        variant="button"
        color={props.variant === 'primary' ? 'background' : 'foreground'}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
