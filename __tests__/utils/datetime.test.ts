import { getTodayOpeningHour, formatDateTime } from '../../app/utils/datetime'

describe('Datetime Utils', () => {
  describe('getTodayOpeningHour', () => {
    // Save the original Date implementation
    const RealDate = global.Date

    beforeEach(() => {
      // Mock the Date to return a specific day (Sunday = 0)
      global.Date = class extends RealDate {
        getDay() {
          return 0 // Sunday
        }
      } as any
    })

    afterEach(() => {
      // Restore the original Date implementation
      global.Date = RealDate
    })

    it('should return the correct opening hours for today', () => {
      // Arrange
      const openingHours = [
        'Sun: 10:00 AM - 6:00 PM',
        'Mon: 9:00 AM - 8:00 PM',
        'Tue: 9:00 AM - 8:00 PM',
        'Wed: 9:00 AM - 8:00 PM',
        'Thu: 9:00 AM - 8:00 PM',
        'Fri: 9:00 AM - 10:00 PM',
        'Sat: 10:00 AM - 10:00 PM',
      ]

      // Act
      const result = getTodayOpeningHour(openingHours)

      // Assert
      expect(result).toBe('Open today: 10:00 AM - 6:00 PM')
    })

    it('should return "Closed today" when the place is closed', () => {
      // Arrange
      const openingHours = [
        'Sun: Closed',
        'Mon: 9:00 AM - 8:00 PM',
        'Tue: 9:00 AM - 8:00 PM',
        'Wed: 9:00 AM - 8:00 PM',
        'Thu: 9:00 AM - 8:00 PM',
        'Fri: 9:00 AM - 10:00 PM',
        'Sat: 10:00 AM - 10:00 PM',
      ]

      // Act
      const result = getTodayOpeningHour(openingHours)

      // Assert
      expect(result).toBe('Closed today')
    })

    it('should return "Closed today" when there is no entry for today', () => {
      // Arrange
      const openingHours = [
        'Mon: 9:00 AM - 8:00 PM',
        'Tue: 9:00 AM - 8:00 PM',
        'Wed: 9:00 AM - 8:00 PM',
        'Thu: 9:00 AM - 8:00 PM',
        'Fri: 9:00 AM - 10:00 PM',
        'Sat: 10:00 AM - 10:00 PM',
      ]

      // Act
      const result = getTodayOpeningHour(openingHours)

      // Assert
      expect(result).toBe('Closed today')
    })

    it('should return "Closed today" when the hours are empty', () => {
      // Arrange
      const openingHours = ['Sun: ', 'Mon: 9:00 AM - 8:00 PM']

      // Act
      const result = getTodayOpeningHour(openingHours)

      // Assert
      expect(result).toBe('Closed today')
    })
  })

  describe('formatDateTime', () => {
    it('should format date correctly', () => {
      // Arrange
      const date = new Date(2023, 5, 15, 14, 30) // June 15, 2023, 14:30

      // Act
      const result = formatDateTime(date)

      // Assert
      expect(result).toBe('Jun 15, 2023 at 14:30')
    })

    it('should handle midnight correctly', () => {
      // Arrange
      const date = new Date(2023, 0, 1, 0, 0) // January 1, 2023, 00:00

      // Act
      const result = formatDateTime(date)

      // Assert
      expect(result).toBe('Jan 1, 2023 at 0:00')
    })

    it('should handle single-digit hours and minutes correctly', () => {
      // Arrange
      const date = new Date(2023, 11, 25, 9, 5) // December 25, 2023, 09:05

      // Act
      const result = formatDateTime(date)

      // Assert
      expect(result).toBe('Dec 25, 2023 at 9:05')
    })
  })
})
