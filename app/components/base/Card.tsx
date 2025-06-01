import React from 'react'
import { Platform, ViewStyle } from 'react-native'
import View, { ViewProps } from './View'

// Define the Card props
export type CardProps = ViewProps & {
  elevation?: number
  shadowOpacity?: number
}

// Create the Card component with shadow styling
const Card = ({
  elevation = 2,
  shadowOpacity = 0.15,
  style,
  backgroundColor = 'cardBackground',
  borderRadius = 'm',
  children,
  ...rest
}: CardProps) => {
  // Generate shadow style based on platform and props
  const shadowStyle: ViewStyle = Platform.select({
    ios: {
      shadowColor: 'black',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity,
      shadowRadius: 5,
    },
    android: {
      elevation,
    },
    default: {},
  })

  return (
    <View style={[shadowStyle, style]} {...rest}>
      <View
        overflow={'hidden'}
        elevation={elevation}
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}>
        {children}
      </View>
    </View>
  )
}

export default Card
