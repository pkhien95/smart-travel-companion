import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStack from '@navigation/root-stack/RootStack.tsx'
import { useColorScheme } from 'react-native'
import { darkTheme, lightTheme } from '@theme'
import { ThemeProvider } from '@shopify/restyle'

function App(): React.JSX.Element {
  const colorScheme = useColorScheme() // from 'react-native'

  const selectedTheme = colorScheme === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={selectedTheme}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App
