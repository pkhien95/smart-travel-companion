import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainStackParams } from './types.ts'
import HomeBottomTabs from '../home-bottom-tabs/HomeBottomTabs.tsx'

const Stack = createNativeStackNavigator<MainStackParams>()

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Home'}
        component={HomeBottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'PlaceDetails'} component={HomeBottomTabs} />
    </Stack.Navigator>
  )
}

export default MainStack
