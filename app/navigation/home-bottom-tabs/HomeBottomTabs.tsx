import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from '@features/dashboard/screens/Dashboard.tsx'
import { HomeBottomTabsParams } from './types.ts'
import TripPlanner from '@features/trip-planner/screens/TripPlanner.tsx'
import Settings from '@features/settings/screens/Settings.tsx'
import FAIcon from '@react-native-vector-icons/fontawesome6'
import IIcon from '@react-native-vector-icons/ionicons'
import { useTheme } from '@shopify/restyle'
import { Theme } from '@theme/light.ts'
import { RouteProp } from '@react-navigation/native'
import localizedStrings from '@localization'
import useSelectedLanguage from '@hooks/useSelectedLanguage.ts'

const Tab = createBottomTabNavigator<HomeBottomTabsParams>()

function TabBarIcon({
  route,
  color,
  size,
}: {
  route: RouteProp<HomeBottomTabsParams, keyof HomeBottomTabsParams>
  focused: boolean
  color: string
  size: number
}) {
  switch (route.name) {
    case 'Dashboard':
      return (
        <FAIcon name={'house'} size={size} color={color} iconStyle={'solid'} />
      )

    case 'TripPlanner':
      return (
        <FAIcon
          name={'calendar-day'}
          size={size}
          color={color}
          iconStyle={'solid'}
        />
      )

    case 'Settings':
      return <IIcon name={'settings'} size={size} color={color} />
  }
}

// This function is defined outside of the component to avoid the ESLint error
const getTabBarIcon = (
  route: RouteProp<HomeBottomTabsParams, keyof HomeBottomTabsParams>,
) => {
  return (props: { focused: boolean; color: string; size: number }) => {
    return <TabBarIcon route={route} {...props} />
  }
}

function HomeBottomTabs() {
  const { colors } = useTheme<Theme>()
  useSelectedLanguage()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: getTabBarIcon(route),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          marginTop: 4,
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      })}>
      <Tab.Screen
        name={'Dashboard'}
        component={Dashboard}
        options={{ title: localizedStrings.tabLabels.dashboard }}
      />
      <Tab.Screen
        name={'TripPlanner'}
        component={TripPlanner}
        options={{ title: localizedStrings.tabLabels.tripPlanner }}
      />
      <Tab.Screen
        name={'Settings'}
        component={Settings}
        options={{ title: localizedStrings.tabLabels.settings }}
      />
    </Tab.Navigator>
  )
}

export default HomeBottomTabs
