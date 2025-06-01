import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { CompositeScreenProps } from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { HomeBottomTabsParams } from '@navigation/home-bottom-tabs/types.ts'
import { Button, ScreenBox, Text, View } from '@components'
import { StyleSheet } from 'react-native'
import useSelectedLanguage from '@hooks/useSelectedLanguage.ts'
import useTheme from '@hooks/useTheme.ts'
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars'
import { useState } from 'react'
import { WINDOW_WIDTH } from '@constants/metrics.ts'

const today = new Date()
const formatDate = (date: Date) => date.toISOString().split('T')[0]

const generateMockData = () => {
  const data: { title: string; data: any[] }[] = []
  for (let i = 0; i < 5; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const key = formatDate(date)
    const items = Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      (_, j) => ({
        title: `Event ${j + 1} on ${key}`,
        height: 70,
        day: key,
      }),
    )
    data.push({ title: key, data: items })
  }
  return data
}

function TripPlanner(
  props: CompositeScreenProps<
    BottomTabScreenProps<HomeBottomTabsParams, 'TripPlanner'>,
    NativeStackScreenProps<MainStackParams>
  >,
) {
  useSelectedLanguage()
  const { colors } = useTheme()
  const [agendaData] = useState(generateMockData)
  const [selectedDate, setSelectedDate] = useState(formatDate(today))

  return (
    <CalendarProvider date={selectedDate} onDateChanged={setSelectedDate}>
      <ScreenBox enableHorizontalInset={false}>
        <ExpandableCalendar
          calendarWidth={WINDOW_WIDTH}
          firstDay={1}
          theme={{
            calendarBackground: colors.background,
            dayTextColor: colors.foreground,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: '#fff',
            todayTextColor: colors.primary,
            textDisabledColor: '#ccc',
          }}
        />

        <AgendaList
          sections={agendaData}
          renderItem={item => (
            <View
              marginHorizontal="m"
              marginVertical="s"
              padding="m"
              backgroundColor="cardBackground"
              shadowOpacity={0.1}
              shadowRadius={4}>
              <Text>{item.section.data.title}</Text>
            </View>
          )}
          sectionStyle={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: colors.background,
          }}
        />

        <Button
          variant="primary"
          marginHorizontal="20"
          marginVertical="20"
          onPress={() => {
            console.log('Add event')
          }}>
          Add Event
        </Button>
      </ScreenBox>
    </CalendarProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    flex: 1,
  },
  scrollViewContainer: {
    paddingBottom: 40,
  },
})

export default TripPlanner
