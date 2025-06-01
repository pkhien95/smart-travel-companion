import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackStackParams } from './types.ts'
import AuthStack from '../auth-stack/AuthStack.tsx'
import MainStack from '../main-stack/MainStack.tsx'
import { useAppSelector } from '@hooks/redux.ts'

const Stack = createNativeStackNavigator<RootStackStackParams>()

function RootStack() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

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
