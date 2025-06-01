# Restyle Design System

## Introduction

The Smart Travel Companion app uses [Shopify's Restyle library](https://github.com/Shopify/restyle) for styling components. Restyle provides a type-safe way to build UI components in React Native with a consistent design language.

For web developers migrating to React Native, Restyle offers a familiar approach to styling that leverages TypeScript and a theme-based system similar to styled-components or Emotion in the web world.

## Key Differences Between Web and React Native Styling

If you're coming from web development, here are some important differences to understand:

1. **No CSS** - React Native doesn't use CSS. Instead, it uses JavaScript objects that look similar to CSS but with camelCase properties (e.g., `backgroundColor` instead of `background-color`).

2. **No Cascading** - Styles don't cascade in React Native. Each component needs to have its styles explicitly defined.

3. **Limited Flexbox** - React Native uses Flexbox for layout, but with some differences from web. For example, `flex-direction: column` is the default in React Native (not `row` as in web).

4. **No Media Queries** - Traditional CSS media queries don't exist in React Native, but Restyle provides responsive variants.

5. **Units** - There are no px, em, rem, etc. in React Native. All dimensions are unitless and represent density-independent pixels.

## How Restyle Works in Our App

Restyle is built around a theme object that defines our design tokens (colors, spacing, typography, etc.). The theme is defined in `app/theme/light.ts` and `app/theme/dark.ts`.

### Theme Structure

Our theme includes:

- **Colors** - Semantic color names mapped to actual color values
- **Spacing** - Consistent spacing values (xs, s, m, l, xl, etc.)
- **Border Radii** - Consistent border radius values
- **Text Variants** - Predefined text styles (header, subheader, body, etc.)
- **Button Variants** - Predefined button styles (primary, secondary)
- **Breakpoints** - For responsive design

### Basic Components

We have several base components built with Restyle:

1. **Text** - For all text elements, with variants for different text styles
2. **View** - A styled container component
3. **Button** - Interactive button component with variants
4. **Card** - Container with predefined styling for card-like UI elements
5. **StyledTouchableOpacity** - Enhanced touchable component with Restyle props

## Using Restyle Components

### Text Component

```tsx
import { Text } from '@components/base'

// Using a predefined variant
<Text variant="header">Hello World</Text>

// Using theme properties directly
<Text color="primary" fontSize={16} fontWeight="bold">Hello World</Text>
```

### View Component

```tsx
import { View } from '@components/base'

<View 
  backgroundColor="background"
  padding="m"
  borderRadius="m"
  flexDirection="row"
>
  {/* Content */}
</View>
```

### Button Component

```tsx
import { Button } from '@components/base'

// Using a predefined variant
<Button variant="primary" onPress={handlePress}>
  Submit
</Button>

// Customizing a button
<Button 
  variant="secondary"
  padding="l"
  borderRadius="l"
  onPress={handlePress}
>
  Cancel
</Button>
```

## Creating Custom Styled Components

You can create your own styled components using Restyle's functions:

### Using createBox

```tsx
import { createBox } from '@shopify/restyle'
import { Theme } from '@theme/light.ts'

const Card = createBox<Theme>()

export default Card
```

### Using createText

```tsx
import { createText } from '@shopify/restyle'
import { Theme } from '@theme/light.ts'

const CustomText = createText<Theme>()

export default CustomText
```

### Using restyleFunctions for Complex Components

For more complex components, you can use `composeRestyleFunctions` and `useRestyle`:

```tsx
import {
  spacing,
  border,
  backgroundColor,
  useRestyle,
  composeRestyleFunctions,
} from '@shopify/restyle'
import { Theme } from '@theme/light.ts'

const restyleFunctions = composeRestyleFunctions([
  spacing,
  border,
  backgroundColor,
])

const MyComponent = (props) => {
  const restyleProps = useRestyle(restyleFunctions, props)
  
  return (
    <TouchableOpacity {...restyleProps}>
      {/* Content */}
    </TouchableOpacity>
  )
}
```

## Best Practices for Web Developers

1. **Think in Components** - In React Native, everything is a component. Break your UI into small, reusable components.

2. **Use Theme Values** - Always use values from the theme (colors, spacing, etc.) instead of hardcoded values.

3. **Embrace TypeScript** - Restyle is built with TypeScript and provides excellent type safety. Use it to your advantage.

4. **Learn Flexbox for React Native** - Invest time in understanding how Flexbox works in React Native, as it's slightly different from web.

5. **Use Variants** - For consistent UI elements, define and use variants in the theme.

6. **Responsive Design** - Use Restyle's responsive utilities for different screen sizes.

7. **Test on Multiple Devices** - Always test your UI on different device sizes and both iOS and Android.

## Examples from Our Codebase

### Theme Definition (app/theme/light.ts)

```tsx
const lightTheme = createTheme({
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.blue,
    // ...more colors
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  // ...other theme properties
})
```

### Button Component (app/components/base/Button.tsx)

```tsx
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
```

## Resources

- [Restyle GitHub Repository](https://github.com/Shopify/restyle)
- [React Native Documentation](https://reactnative.dev/docs/style)
- [React Native Flexbox Guide](https://reactnative.dev/docs/flexbox)
