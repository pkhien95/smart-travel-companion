import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { CompositeScreenProps } from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { HomeBottomTabsParams } from '@navigation/home-bottom-tabs/types.ts'
import { Text } from '@components/base'
import { ScreenBox } from '@components'
import { ScrollView, StyleSheet } from 'react-native'
import WeatherInfo from '../components/WeatherInfo.tsx'
import SuggestedPlaces from '../components/SuggestedPlaces/SuggestedPlaces.tsx'
import SavedPlaces from '../components/SavedPlaces/SavedPlaces.tsx'
import localizedStrings from '@localization'
import useSelectedLanguage from '@hooks/useSelectedLanguage.ts'

function Dashboard(
  props: CompositeScreenProps<
    BottomTabScreenProps<HomeBottomTabsParams, 'Dashboard'>,
    NativeStackScreenProps<MainStackParams>
  >,
) {
  useSelectedLanguage()
  const strings = localizedStrings.dashboard

  return (
    <ScreenBox edges={['top']} style={styles.container}>
      <Text variant={'header'} mx={'20'} mt={'m'} mb={'s'}>
        {strings.screenTitle}
      </Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <WeatherInfo px={'20'} pt={'m'} />
        <SuggestedPlaces mt={'xl'} />
        <SavedPlaces mt={'l'} />
      </ScrollView>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  scrollView: {},
  scrollViewContainer: {
    paddingBottom: 40,
  },
})

export default Dashboard
