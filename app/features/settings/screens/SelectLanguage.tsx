import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { ScreenBox, Text, View } from '@components'
import ScreenHeader from '@components/layout/ScreenHeader.tsx'
import { LANGUAGES } from '@constants/languages.ts'
import StyledTouchableOpacity from '@components/base/StyledTouchableOpacity.tsx'
import { useAppDispatch, useAppSelector } from '@hooks/redux.ts'
import { ScrollView, StyleSheet } from 'react-native'
import Icon from '@react-native-vector-icons/ionicons'
import useTheme from '@hooks/useTheme.ts'
import { setLanguage, SupportedLanguages } from '@state/slices/settingsSlice.ts'
import localizedStrings from '@localization'

const SelectLanguage = (
  _props: NativeStackScreenProps<MainStackParams, 'SelectLanguage'>,
) => {
  const { language } = useAppSelector(state => state.settings)
  const dispatch = useAppDispatch()
  const { colors } = useTheme()

  const onSelectLanguage = (newLanguage: SupportedLanguages) => {
    localizedStrings.setLanguage(newLanguage)
    dispatch(setLanguage(newLanguage))
  }

  return (
    <ScreenBox edges={['bottom']} enableHorizontalInset={false}>
      <ScreenHeader
        titleComponent={localizedStrings.selectLanguage.screenTitle}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}>
        <View gap={'12'}>
          {Object.keys(LANGUAGES).map(value => (
            <StyledTouchableOpacity
              onPress={() => onSelectLanguage(value as SupportedLanguages)}
              flexDirection={'row'}
              alignItems={'center'}
              py={'12'}>
              <Text variant={'body'} flex={1}>
                {LANGUAGES[value as SupportedLanguages]}
              </Text>
              {value === language && (
                <Icon
                  name={'checkmark-sharp'}
                  size={22}
                  color={colors.primary}
                />
              )}
            </StyledTouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingBottom: 40,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
})

export default SelectLanguage
