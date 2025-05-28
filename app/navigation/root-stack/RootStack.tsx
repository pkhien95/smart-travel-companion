import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackStackParams } from './types.ts'
import AuthStack from '../auth-stack/AuthStack.tsx'
import MainStack from '../main-stack/MainStack.tsx'

const Stack = createNativeStackNavigator<RootStackStackParams>()

function RootStack() {
  const isLoggedIn = true

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name={'Main'} component={MainStack} />
      ) : (
        <Stack.Screen name={'Auth'} component={AuthStack} />
      )}
    </Stack.Navigator>
  )
}

export default RootStack
