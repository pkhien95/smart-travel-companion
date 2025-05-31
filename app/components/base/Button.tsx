import React, { ComponentProps } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  composeRestyleFunctions,
  createVariant,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle,
  VariantProps,
} from '@shopify/restyle'
import { Theme } from '@theme/light.ts'
import Text from './Text'
import View from './View.tsx'

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  VariantProps<Theme, 'buttonVariants'>

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
  layout,
  createVariant({ themeKey: 'buttonVariants' }),
])

export type ButtonProps = RestyleProps &
  ComponentProps<typeof TouchableOpacity> & {
    leftComponent?: React.ReactNode
  }

const Button = (props: ButtonProps) => {
  const { children, leftComponent, ...rest } = props
  const restyleProps = useRestyle(restyleFunctions, rest)

  return (
    <TouchableOpacity style={styles.container} {...restyleProps}>
      <View mr={'s'}>{leftComponent}</View>
      <>
        {typeof children === 'string' ? (
          <Text
            variant="button"
            color={props.variant === 'primary' ? 'background' : 'foreground'}>
            {children}
          </Text>
        ) : (
          { children }
        )}
      </>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default Button
