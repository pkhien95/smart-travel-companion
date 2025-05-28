import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { CompositeScreenProps } from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { HomeBottomTabsParams } from '@navigation/home-bottom-tabs/types.ts'

function Dashboard(
  props: CompositeScreenProps<
    BottomTabScreenProps<HomeBottomTabsParams, 'Dashboard'>,
    NativeStackScreenProps<MainStackParams>
  >,
) {
  return null
}

export default Dashboard
