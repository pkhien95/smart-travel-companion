import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from '@features/dashboard/screens/Dashboard.tsx'
import { HomeBottomTabsParams } from './types.ts'
import TripPlanner from '@features/trip-planner/screens/TripPlanner.tsx'
import Settings from '@features/settings/screens/Settings.tsx'

const Tab = createBottomTabNavigator<HomeBottomTabsParams>()

function HomeBottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={'Dashboard'} component={Dashboard} />
      <Tab.Screen name={'TripPlanner'} component={TripPlanner} />
      <Tab.Screen name={'Settings'} component={Settings} />
    </Tab.Navigator>
  )
}

export default HomeBottomTabs
