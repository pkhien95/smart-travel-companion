import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParams } from '@navigation/main-stack/types.ts'
import { CompositeScreenProps, useFocusEffect } from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { HomeBottomTabsParams } from '@navigation/home-bottom-tabs/types.ts'
import { Button, ScreenBox, Text, View } from '@components'
import { ActivityIndicator, SectionListRenderItemInfo } from 'react-native'
import useSelectedLanguage from '@hooks/useSelectedLanguage.ts'
import useTheme from '@hooks/useTheme.ts'
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars'
import { useCallback, useMemo, useState } from 'react'
import { WINDOW_WIDTH } from '@constants/metrics.ts'
import { fetchCalendarEvents, formatDate } from '@utils/calendar.ts'
import { formatEventsForAgenda, formatEventsForMarkedDates } from '../utils.ts'
import localizedStrings from '@localization'
import { useAppSelector } from '@hooks/redux.ts'

const today = new Date()

function TripPlanner(
  props: CompositeScreenProps<
    BottomTabScreenProps<HomeBottomTabsParams, 'TripPlanner'>,
    NativeStackScreenProps<MainStackParams>
  >,
) {
  const { navigation } = props
  useSelectedLanguage()
  const { theme } = useAppSelector(state => state.settings)

  const { colors } = useTheme()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [agendaData, setAgendaData] = useState<
    { title: string; data: any[] }[]
  >([])
  const [markedDates, setMarkedDates] = useState<
    Record<string, { marked: boolean; dotColor: string }>
  >({})
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()))
  const strings = localizedStrings.tripPlanner

  // Fetch calendar events
  useFocusEffect(
    useCallback(() => {
      const fetchEvents = async () => {
        setLoading(true)
        setError(null)

        try {
          // Calculate start and end dates (90 days after today)
          const startDate = new Date(today)
          startDate.setHours(0, 0, 0, 0)

          const endDate = new Date(today)
          endDate.setDate(today.getDate() + 90)

          // Fetch events with a limit of 100 for performance
          const events = await fetchCalendarEvents(startDate, endDate, 100)

          if (events) {
            // Format events for the AgendaList
            const formattedEvents = formatEventsForAgenda(events)
            setAgendaData(formattedEvents)

            // Format events for marking dates with dots
            const formattedMarkedDates = formatEventsForMarkedDates(
              events,
              colors.secondary,
            )
            setMarkedDates(formattedMarkedDates)
          } else {
            // If no events or permission denied, set empty data
            setAgendaData([])
            setMarkedDates({})
          }
        } catch (err) {
          setError('Failed to load calendar events')
          setAgendaData([])
          setMarkedDates({})
        } finally {
          setLoading(false)
        }
      }

      fetchEvents()
    }, [colors.secondary]),
  )

  const onPressRetry = async () => {
    setLoading(true)
    setError(null)
    try {
      const events = await fetchCalendarEvents(
        new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
        new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000),
        100,
      )
      if (events) {
        setAgendaData(formatEventsForAgenda(events))
        setMarkedDates(formatEventsForMarkedDates(events, colors.secondary))
      } else {
        setAgendaData([])
        setMarkedDates({})
      }
      setLoading(false)
    } catch {
      setError('Failed to load calendar events')
      setMarkedDates({})
      setLoading(false)
    }
  }

  const renderAgendaItem = useCallback(
    ({ item }: SectionListRenderItemInfo<any>) => (
      <View
        marginHorizontal="m"
        marginVertical="s"
        padding="m"
        backgroundColor="cardBackground"
        shadowOpacity={0.1}
        shadowRadius={4}>
        <Text fontWeight="bold">{item.title}</Text>
        {item.location ? (
          <Text fontSize={12} marginTop="xs" color="textSubdued">
            {item.location}
          </Text>
        ) : null}
        <Text fontSize={12} marginTop="xs" color="textSubdued">
          {new Date(item.startDate).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
          {item.endDate
            ? ` - ${new Date(item.endDate).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}`
            : ''}
        </Text>
      </View>
    ),
    [],
  )

  const onPressAddEvent = () => {
    navigation.navigate('AddEvent', {
      date: selectedDate,
    })
  }

  const calendarTheme = useMemo(
    () => ({
      calendarBackground: colors.background,
      dayTextColor: colors.foreground,
      selectedDayBackgroundColor: colors.primary,
      selectedDayTextColor: '#fff',
      todayTextColor: colors.primary,
      textDisabledColor: colors.foreground,
    }),
    [colors.background, colors.foreground, colors.primary],
  )

  return (
    <CalendarProvider date={selectedDate} onDateChanged={setSelectedDate}>
      <ScreenBox enableHorizontalInset={false} edges={['top']}>
        <Text variant={'header'} mx={'20'} mt={'m'} mb={'s'}>
          {strings.screenTitle}
        </Text>
        <ExpandableCalendar
          calendarWidth={WINDOW_WIDTH}
          firstDay={1}
          markedDates={markedDates}
          extraData={theme}
          theme={calendarTheme}
        />

        {loading ? (
          <View flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : error ? (
          <View flex={1} justifyContent="center" alignItems="center">
            <Text color="danger" marginBottom="m">
              {error}
            </Text>
            <Button variant="primary" onPress={onPressRetry}>
              Retry
            </Button>
          </View>
        ) : (
          <AgendaList
            sections={agendaData}
            renderItem={renderAgendaItem}
            sectionStyle={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: colors.background,
            }}
          />
        )}

        <Button
          variant="primary"
          marginHorizontal="20"
          marginVertical="20"
          onPress={onPressAddEvent}>
          {strings.addEvent}
        </Button>
      </ScreenBox>
    </CalendarProvider>
  )
}

export default TripPlanner
