import dayjs from 'dayjs'

export function getTodayOpeningHour(openingHours: string[]): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = new Date().getDay() // 0 = Sunday
  const todayPrefix = days[today] + ':'

  const todayEntry = openingHours.find(entry => entry.startsWith(todayPrefix))

  if (!todayEntry) return 'Closed today'

  const hours = todayEntry.replace(todayPrefix, '').trim()
  return hours.toLowerCase().includes('closed') || hours === ''
    ? 'Closed today'
    : `Open today: ${hours}`
}

/**
 * Formats a Date object into a readable string (e.g., "Jun 1, 2025 at 8:00")
 * @param date - The Date object to format
 * @returns Formatted date string
 */
export const formatDateTime = (date: Date): string => {
  return dayjs(date).format('MMM D, YYYY [at] H:mm')
}
