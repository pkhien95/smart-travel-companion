import { Alert, Platform } from 'react-native'
import CalendarEvents, {
  CalendarEventReadable,
  CalendarEventWritable,
} from 'react-native-calendar-events'
import { PERMISSIONS } from 'react-native-permissions'

import { safeRequestPermissions } from './permissions'
import { get } from 'lodash'

export interface CalendarEvent extends CalendarEventWritable {
  title: string
}

export interface CalendarEventWithDay extends CalendarEventReadable {
  day: string
}

export async function addEventToCalendar(
  event: CalendarEvent,
): Promise<Nullable<string>> {
  const permissions = Platform.select({
    ios: [PERMISSIONS.IOS.CALENDARS],
    android: [
      PERMISSIONS.ANDROID.WRITE_CALENDAR,
      PERMISSIONS.ANDROID.READ_CALENDAR,
    ],
  })
  if (permissions === undefined) {
    return null
  }
  const permissionStatus = await safeRequestPermissions(permissions)
  if (
    permissionStatus === null ||
    permissionStatus[permissions[0]] !== 'granted'
  ) {
    Alert.alert('', "You need to grant calendar permissions to add events'")
    return null
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { title, id, alarms, ...eventDetails } = event
    if (event.recurrenceRule) {
      // @ts-ignore
      eventDetails.recurrenceRule = {
        // @ts-ignore
        // Workaround: https://github.com/wmcmahan/react-native-calendar-events/issues/445
        duration: null,
        frequency: event.recurrenceRule.frequency,
        occurrence: event.recurrenceRule.occurrence,
      }
    }
    const transformedAlarms = alarms?.map(alarm => {
      if (typeof alarm.date === 'number') {
        return {
          ...alarm,
          date:
            Platform.OS === 'ios'
              ? -Math.abs(alarm.date)
              : Math.abs(alarm.date),
        }
      }

      return alarm
    })
    return await CalendarEvents.saveEvent(title, {
      ...eventDetails,
      alarms: transformedAlarms,
    })
  } catch (e) {
    Alert.alert('Failed to add event', get(e, 'message', 'Unknown error'))
    return null
  }
}

export async function fetchCalendarEvents(
  startDate: Date,
  endDate: Date,
  limit?: number,
): Promise<Nullable<CalendarEventWithDay[]>> {
  const permissions = Platform.select({
    ios: [PERMISSIONS.IOS.CALENDARS],
    android: [PERMISSIONS.ANDROID.READ_CALENDAR],
  })

  if (permissions === undefined) {
    return null
  }

  const permissionStatus = await safeRequestPermissions(permissions)
  if (
    permissionStatus === null ||
    permissionStatus[permissions[0]] !== 'granted'
  ) {
    Alert.alert('', 'You need to grant calendar permissions to view events')
    return null
  }

  try {
    // Format dates for the API
    const start = startDate.toISOString()
    const end = endDate.toISOString()

    // Fetch events from all calendars
    const events = await CalendarEvents.fetchAllEvents(start, end)
    // Add day property and limit if needed
    const formattedEvents = events.map(event => ({
      ...event,
      day: formatDate(new Date(event.startDate)),
    }))

    return limit ? formattedEvents.slice(0, limit) : formattedEvents
  } catch (e) {
    console.log('Im here')
    return null
  }
}

// Helper function to format date to YYYY-MM-DD, respecting local timezone
export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
