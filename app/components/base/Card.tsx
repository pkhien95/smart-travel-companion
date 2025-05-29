import React from 'react'
import { StyleSheet, Platform, ViewStyle } from 'react-native'
import { createBox } from '@shopify/restyle'
import { Theme } from '@theme/light.ts'
import View, { ViewProps } from './View'

// Create the base component using createBox
const BaseCard = createBox<Theme>()

// Define the Card props
export type CardProps = ViewProps & {
  elevation?: number
  shadowOpacity?: number
}

// Create the Card component with shadow styling
const Card = ({
  elevation = 3,
  shadowOpacity = 0.15,
  style,
  backgroundColor = 'cardBackground',
  borderRadius = 'm',
  padding = 'm',
  ...rest
}: CardProps) => {
  // Generate shadow style based on platform and props
  const shadowStyle: ViewStyle = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation },
      shadowOpacity,
      shadowRadius: elevation,
    },
    android: {
      elevation,
    },
    default: {},
  })

  return (
    <BaseCard
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      padding={padding}
      style={[shadowStyle, style]}
      {...rest}
    />
  )
}

export default Card
