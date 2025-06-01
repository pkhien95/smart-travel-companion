import { Alert, Platform } from 'react-native'
import CalendarEvents, {
  CalendarEventWritable,
} from 'react-native-calendar-events'
import DeviceInfo from 'react-native-device-info'
import { PERMISSIONS } from 'react-native-permissions'

import { safeRequestPermissions } from './permissions'

export interface CalendarEvent extends CalendarEventWritable {
  title: string
}

export async function addEventToCalendar(
  event: CalendarEvent,
): Promise<Nullable<string>> {
  const permissions = Platform.select({
    ios: [PERMISSIONS.IOS.CALENDARS_WRITE_ONLY],
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
    console.error(e)
    return null
  }
}

export function canUseCalendar(): boolean {
  try {
    return (
      Platform.OS === 'android' ||
      (Platform.OS === 'ios' &&
        parseInt(DeviceInfo.getSystemVersion(), 10) >= 17)
    )
  } catch (e) {
    console.error(e)
    return false
  }
}
