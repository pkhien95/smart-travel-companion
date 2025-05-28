/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStack from '@navigation/root-stack/RootStack.tsx'

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}

export default App
