import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { CompositeScreenProps } from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { HomeBottomTabsParams } from '@navigation/home-bottom-tabs/types.ts'
import { Card, ScreenBox, Text } from '@components'
import localizedStrings from '@localization'
import { ScrollView, StyleSheet } from 'react-native'
import StyledTouchableOpacity from '@components/base/StyledTouchableOpacity.tsx'
import { useAppSelector } from '@hooks/redux.ts'
import { LANGUAGES } from '@constants/languages.ts'
import Icon from '@react-native-vector-icons/ionicons'
import { THEMES } from '@constants/themes.ts'
import useTheme from '@hooks/useTheme.ts'
import useSelectedLanguage from '@hooks/useSelectedLanguage.ts'

function Settings(
  props: CompositeScreenProps<
    BottomTabScreenProps<HomeBottomTabsParams, 'Settings'>,
    NativeStackScreenProps<MainStackParams>
  >,
) {
  const { navigation } = props
  const { language, theme } = useAppSelector(state => state.settings)
  const strings = localizedStrings.settings
  const { colors } = useTheme()
  useSelectedLanguage()

  return (
    <ScreenBox edges={['top']} enableHorizontalInset={false}>
      <Text variant={'header'} mx={'20'} mt={'m'} mb={'s'}>
        {strings.screenTitle}
      </Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Card pt={'12'}>
          <StyledTouchableOpacity
            onPress={() => navigation.navigate('SelectLanguage')}
            flexDirection={'row'}
            alignItems={'center'}
            py={'12'}
            px={'12'}>
            <Text variant={'medium'} flex={1}>
              {strings.languageOption}
            </Text>
            <Text variant={'medium'} color={'textSubdued'} mr={'xs'}>
              {LANGUAGES[language]}
            </Text>
            <Icon
              name={'chevron-forward'}
              size={16}
              color={colors.textSubdued}
            />
          </StyledTouchableOpacity>
        </Card>

        <Card pt={'12'}>
          <StyledTouchableOpacity
            onPress={() => navigation.navigate('SelectTheme')}
            flexDirection={'row'}
            alignItems={'center'}
            py={'12'}
            px={'12'}>
            <Text variant={'medium'} flex={1}>
              {strings.themeOption}
            </Text>
            <Text variant={'medium'} color={'textSubdued'}>
              {THEMES[theme]}
            </Text>
            <Icon
              name={'chevron-forward'}
              size={16}
              color={colors.textSubdued}
            />
          </StyledTouchableOpacity>
        </Card>
      </ScrollView>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
  },
  scrollViewContainer: {
    paddingBottom: 40,
  },
})

export default Settings
