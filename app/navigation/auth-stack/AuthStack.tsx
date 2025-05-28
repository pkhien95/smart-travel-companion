import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParams } from './types.ts'
import Login from '@features/auth/screens/Login.tsx'

const Stack = createNativeStackNavigator<AuthStackParams>()

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Login'} component={Login} />
    </Stack.Navigator>
  )
}

export default AuthStack
