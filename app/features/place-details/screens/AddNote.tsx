import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { ScreenBox, Text, View } from '@components'
import { ScrollView, StyleSheet, TextInput } from 'react-native'
import ScreenHeader from '@components/layout/ScreenHeader.tsx'
import { DEFAULT_HIT_SLOP, WINDOW_HEIGHT } from '@constants/metrics.ts'
import StyledTouchableOpacity from '@components/base/StyledTouchableOpacity.tsx'
import { useAppDispatch } from '@hooks/redux.ts'
import { addNote } from '@state/slices/placesSlice.ts'
import { useState } from 'react'
import localizedStrings from '@localization'

const AddNote = (props: NativeStackScreenProps<MainStackParams, 'AddNote'>) => {
  const { navigation, route } = props
  const dispatch = useAppDispatch()
  const [note, setNote] = useState<string>('')
  const strings = localizedStrings.addNote

  const isValid = note.trim().length > 0

  const onPressDone = () => {
    dispatch(
      addNote({
        placeId: route.params.placeId,
        note: note.trim(),
      }),
    )
    navigation.goBack()
  }

  return (
    <ScreenBox edges={['bottom']} enableHorizontalInset={false}>
      <ScreenHeader
        titleComponent={strings.screenTitle}
        rightComponent={
          <StyledTouchableOpacity
            px={'l'}
            hitSlop={DEFAULT_HIT_SLOP}
            disabled={!isValid}
            onPress={onPressDone}>
            <Text variant={'subheader'} color={isValid ? 'primary' : 'muted'}>
              {localizedStrings.common.done}
            </Text>
          </StyledTouchableOpacity>
        }
      />
      <ScrollView>
        <View
          mx={'20'}
          px={'m'}
          py={'m'}
          backgroundColor={'primaryLight'}
          borderRadius={'m'}
          mt={'20'}>
          <TextInput
            value={note}
            onChangeText={setNote}
            style={styles.input}
            multiline={true}
            placeholder={strings.inputPlaceholder}
            autoFocus={true}
          />
        </View>
      </ScrollView>
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    minHeight: WINDOW_HEIGHT / 3,
    maxHeight: WINDOW_HEIGHT / 2,
    fontFamily: 'Inter-Regular',
  },
})

export default AddNote
