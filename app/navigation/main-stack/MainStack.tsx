import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainStackParams } from './types.ts'
import HomeBottomTabs from '../home-bottom-tabs/HomeBottomTabs.tsx'
import PlaceDetails from '@features/place-details/screens/PlaceDetails.tsx'
import AddNote from '@features/place-details/screens/AddNote.tsx'
import EditNote from '@features/place-details/screens/EditNote.tsx'
import SelectLanguage from '@features/settings/screens/SelectLanguage.tsx'
import SelectTheme from '@features/settings/screens/SelectTheme.tsx'
import AddEvent from '@features/trip-planner/screens/AddEvent.tsx'

const Stack = createNativeStackNavigator<MainStackParams>()

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Home'}
        component={HomeBottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'PlaceDetails'}
        component={PlaceDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'AddNote'}
        component={AddNote}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'EditNote'}
        component={EditNote}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'SelectLanguage'}
        component={SelectLanguage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'SelectTheme'}
        component={SelectTheme}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'AddEvent'}
        component={AddEvent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default MainStack
