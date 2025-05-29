import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from '@features/dashboard/screens/Dashboard.tsx'
import { HomeBottomTabsParams } from './types.ts'
import TripPlanner from '@features/trip-planner/screens/TripPlanner.tsx'
import Settings from '@features/settings/screens/Settings.tsx'
import Icon from '@react-native-vector-icons/fontawesome6'
import { useTheme } from '@shopify/restyle'
import { Theme } from '@theme/light.ts'

const Tab = createBottomTabNavigator<HomeBottomTabsParams>()

function HomeBottomTabs() {
  const { colors } = useTheme<Theme>()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'Dashboard':
              return (
                <Icon
                  name={'house'}
                  size={size}
                  color={color}
                  iconStyle={'solid'}
                />
              )

            case 'TripPlanner':
              return (
                <Icon
                  name={'calendar-day'}
                  size={size}
                  color={color}
                  iconStyle={'solid'}
                />
              )

            case 'Settings':
              return <Icon name={'eye'} size={size} color={color} />
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          marginTop: 4,
        },
        headerShown: false,
      })}>
      <Tab.Screen name={'Dashboard'} component={Dashboard} />
      <Tab.Screen name={'TripPlanner'} component={TripPlanner} />
      <Tab.Screen name={'Settings'} component={Settings} />
    </Tab.Navigator>
  )
}

export default HomeBottomTabs
