import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { useAppDispatch, useAppSelector } from '@hooks/redux.ts'
import useTheme from '@hooks/useTheme.ts'
import { setTheme, SupportedTheme } from '@state/slices/settingsSlice.ts'
import localizedStrings from '@localization'
import { ScreenBox, Text, View } from '@components'
import ScreenHeader from '@components/layout/ScreenHeader.tsx'
import { ScrollView, StyleSheet } from 'react-native'
import StyledTouchableOpacity from '@components/base/StyledTouchableOpacity.tsx'
import Icon from '@react-native-vector-icons/ionicons'
import { THEMES } from '@constants/themes.ts'

const SelectTheme = (
  _props: NativeStackScreenProps<MainStackParams, 'SelectTheme'>,
) => {
  const { theme } = useAppSelector(state => state.settings)
  const dispatch = useAppDispatch()
  const { colors } = useTheme()

  const onSelectTheme = (newTheme: SupportedTheme) => {
    dispatch(setTheme(newTheme))
  }

  return (
    <ScreenBox edges={['bottom']} enableHorizontalInset={false}>
      <ScreenHeader titleComponent={localizedStrings.selectTheme.screenTitle} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}>
        <View gap={'12'}>
          {Object.keys(THEMES).map(value => (
            <StyledTouchableOpacity
              onPress={() => onSelectTheme(value as SupportedTheme)}
              flexDirection={'row'}
              alignItems={'center'}
              py={'12'}>
              <Text variant={'body'} flex={1}>
                {THEMES[value as SupportedTheme]}
              </Text>
              {value === theme && (
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

export default SelectTheme
