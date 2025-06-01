import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { ScreenBox, Text, View } from '@components'
import { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { ScrollView, StyleSheet, TextInput } from 'react-native'
import { DEFAULT_HIT_SLOP, WINDOW_HEIGHT } from '@constants/metrics.ts'
import ScreenHeader from '@components/layout/ScreenHeader.tsx'
import StyledTouchableOpacity from '@components/base/StyledTouchableOpacity.tsx'
import localizedStrings from '@localization'
import { formatDateTime } from '@utils/datetime.ts'
import { addEventToCalendar, CalendarEvent } from '@utils/calendar.ts'
import useSelectedLanguage from '@hooks/useSelectedLanguage.ts'

function AddEvent(props: NativeStackScreenProps<MainStackParams, 'AddEvent'>) {
  const { navigation, route } = props
  useSelectedLanguage()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startTime, setStartTime] = useState(new Date(route.params.date))
  const [endTime, setEndTime] = useState(new Date(route.params.date))
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false)
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const strings = localizedStrings.addEvent

  const isValid = title.trim().length > 0

  const onPressDone = async () => {
    try {
      setIsAdding(true)
      const alarmAt = new Date(startTime)
      alarmAt.setMinutes(startTime.getMinutes() - 15)
      const event: CalendarEvent = {
        title,
        description,
        startDate: startTime.toISOString(),
        endDate: endTime.toISOString(),
        alarms: [
          {
            date: alarmAt.toISOString(),
          },
        ],
        notes: description,
      }
      await addEventToCalendar(event)
      navigation.goBack()
    } catch (e) {
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <ScreenBox edges={['bottom']} enableHorizontalInset={false}>
      <ScreenHeader
        titleComponent={strings.screenTitle}
        rightComponent={
          <StyledTouchableOpacity
            px={'l'}
            hitSlop={DEFAULT_HIT_SLOP}
            disabled={!isValid || isAdding}
            onPress={onPressDone}>
            <Text
              variant={'subheader'}
              color={isValid && !isAdding ? 'primary' : 'muted'}>
              {localizedStrings.common.done}
            </Text>
          </StyledTouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View
          px={'m'}
          py={'m'}
          backgroundColor={'primaryLight'}
          borderRadius={'m'}
          mt={'20'}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.titleInput}
            placeholder={strings.titlePlaceholder}
            autoFocus={true}
          />
        </View>

        <View
          px={'m'}
          py={'m'}
          backgroundColor={'primaryLight'}
          borderRadius={'m'}
          mt={'20'}>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={styles.descriptionInput}
            multiline={true}
            placeholder={strings.descriptionPlaceholder}
            autoFocus={true}
          />
        </View>

        <View flexDirection={'row'} mt={'l'}>
          <Text variant={'medium'} flex={1} mr={'l'}>
            {strings.startTime}
          </Text>
          <StyledTouchableOpacity onPress={() => setOpenStartTimePicker(true)}>
            <Text>{formatDateTime(startTime)}</Text>
          </StyledTouchableOpacity>
        </View>

        <View flexDirection={'row'} mt={'l'}>
          <Text variant={'medium'} flex={1} mr={'l'}>
            {strings.endTime}
          </Text>
          <StyledTouchableOpacity onPress={() => setOpenEndTimePicker(true)}>
            <Text>{formatDateTime(endTime)}</Text>
          </StyledTouchableOpacity>
        </View>
      </ScrollView>
      <DatePicker
        date={startTime}
        modal={true}
        open={openStartTimePicker}
        onCancel={() => setOpenStartTimePicker(false)}
        onConfirm={date => {
          setOpenStartTimePicker(false)
          setStartTime(date)
        }}
      />
      <DatePicker
        date={endTime}
        modal={true}
        open={openEndTimePicker}
        onCancel={() => setOpenEndTimePicker(false)}
        onConfirm={date => {
          setOpenEndTimePicker(false)
          setEndTime(date)
        }}
      />
    </ScreenBox>
  )
}

const styles = StyleSheet.create({
  titleInput: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
  },
  descriptionInput: {
    fontSize: 16,
    height: WINDOW_HEIGHT / 5,
    fontFamily: 'Inter-Regular',
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
  },
})

export default AddEvent
