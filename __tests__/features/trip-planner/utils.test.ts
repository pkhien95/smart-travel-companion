import {
  formatEventsForAgenda,
  formatEventsForMarkedDates,
} from '../../../app/features/trip-planner/utils'

describe('Trip Planner Utils', () => {
  describe('formatEventsForAgenda', () => {
    it('should format events for agenda correctly', () => {
      // Arrange
      const events = [
        { id: '1', title: 'Event 1', day: '2023-01-01' },
        { id: '2', title: 'Event 2', day: '2023-01-01' },
        { id: '3', title: 'Event 3', day: '2023-01-02' },
      ]

      // Act
      const result = formatEventsForAgenda(events)

      // Assert
      expect(result).toHaveLength(2)
      expect(result[0].title).toBe('2023-01-01')
      expect(result[0].data).toHaveLength(2)
      expect(result[0].data[0].id).toBe('1')
      expect(result[0].data[0].height).toBe(70)
      expect(result[1].title).toBe('2023-01-02')
      expect(result[1].data).toHaveLength(1)
      expect(result[1].data[0].id).toBe('3')
    })

    it('should return empty array for empty events', () => {
      // Arrange
      const events: any[] = []

      // Act
      const result = formatEventsForAgenda(events)

      // Assert
      expect(result).toHaveLength(0)
    })

    it('should sort days chronologically', () => {
      // Arrange
      const events = [
        { id: '1', title: 'Event 1', day: '2023-01-03' },
        { id: '2', title: 'Event 2', day: '2023-01-01' },
        { id: '3', title: 'Event 3', day: '2023-01-02' },
      ]

      // Act
      const result = formatEventsForAgenda(events)

      // Assert
      expect(result).toHaveLength(3)
      expect(result[0].title).toBe('2023-01-01')
      expect(result[1].title).toBe('2023-01-02')
      expect(result[2].title).toBe('2023-01-03')
    })
  })

  describe('formatEventsForMarkedDates', () => {
    it('should format events for marked dates correctly', () => {
      // Arrange
      const events = [
        { id: '1', title: 'Event 1', day: '2023-01-01' },
        { id: '2', title: 'Event 2', day: '2023-01-01' },
        { id: '3', title: 'Event 3', day: '2023-01-02' },
      ]
      const dotColor = 'red'

      // Act
      const result = formatEventsForMarkedDates(events, dotColor)

      // Assert
      expect(Object.keys(result)).toHaveLength(2)
      expect(result['2023-01-01']).toEqual({ marked: true, dotColor: 'red' })
      expect(result['2023-01-02']).toEqual({ marked: true, dotColor: 'red' })
    })

    it('should return empty object for empty events', () => {
      // Arrange
      const events: any[] = []
      const dotColor = 'red'

      // Act
      const result = formatEventsForMarkedDates(events, dotColor)

      // Assert
      expect(Object.keys(result)).toHaveLength(0)
    })

    it('should handle multiple events on the same day', () => {
      // Arrange
      const events = [
        { id: '1', title: 'Event 1', day: '2023-01-01' },
        { id: '2', title: 'Event 2', day: '2023-01-01' },
      ]
      const dotColor = 'blue'

      // Act
      const result = formatEventsForMarkedDates(events, dotColor)

      // Assert
      expect(Object.keys(result)).toHaveLength(1)
      expect(result['2023-01-01']).toEqual({ marked: true, dotColor: 'blue' })
    })
  })
})
