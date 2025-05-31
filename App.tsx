import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStack from '@navigation/root-stack/RootStack.tsx'
import { useColorScheme } from 'react-native'
import { lightTheme } from '@theme'
import { ThemeProvider } from '@shopify/restyle'
import { Provider } from 'react-redux'
import { store } from '@state/store.ts'
import BootSplash from 'react-native-bootsplash'

function App(): React.JSX.Element {
  const colorScheme = useColorScheme() // from 'react-native'

  const selectedTheme = lightTheme

  useEffect(() => {
    BootSplash.hide({ fade: true })
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={selectedTheme}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  )
}

export default App
