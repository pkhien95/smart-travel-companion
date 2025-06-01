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
