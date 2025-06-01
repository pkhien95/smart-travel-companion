// Format calendar events for the AgendaList component
export const formatEventsForAgenda = (events: any[]) => {
  // Group events by day
  const eventsByDay: Record<string, any[]> = {}

  events.forEach(event => {
    const day = event.day
    if (!eventsByDay[day]) {
      eventsByDay[day] = []
    }
    eventsByDay[day].push({
      ...event,
      height: 70, // Fixed height for consistent UI
    })
  })

  // Convert to the format expected by AgendaList
  return Object.keys(eventsByDay)
    .map(day => ({
      title: day,
      data: eventsByDay[day],
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

// Format calendar events for marking dates with dots
export const formatEventsForMarkedDates = (events: any[], dotColor: string) => {
  const markedDates: Record<string, { marked: boolean; dotColor: string }> = {}

  // Mark each day that has events with a dot
  events.forEach(event => {
    const day = event.day
    markedDates[day] = { marked: true, dotColor }
  })

  return markedDates
}
