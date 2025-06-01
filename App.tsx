import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStack from '@navigation/root-stack/RootStack.tsx'
import { ThemeProvider } from '@shopify/restyle'
import { Provider } from 'react-redux'
import { persistor, store } from '@state/store.ts'
import BootSplash from 'react-native-bootsplash'
import linking from '@navigation/linking'
import { PersistGate } from 'redux-persist/integration/react'
import useSelectedTheme from '@hooks/useSelectedTheme.ts'
import localizedStrings from '@localization'

function AppContent(): React.JSX.Element {
  const selectedTheme = useSelectedTheme()

  useEffect(() => {
    async function init() {
      const language = store.getState().settings.language
      localizedStrings.setLanguage(language)
      BootSplash.hide({ fade: true })
    }

    init()
  }, [])

  return (
    <ThemeProvider theme={selectedTheme}>
      <NavigationContainer linking={linking}>
        <RootStack />
      </NavigationContainer>
    </ThemeProvider>
  )
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  )
}

export default App
