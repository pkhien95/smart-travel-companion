// // Mock implementation of formatDate
// function formatDate(date: Date): string {
//   const year = date.getFullYear()
//   const month = String(date.getMonth() + 1).padStart(2, '0')
//   const day = String(date.getDate()).padStart(2, '0')
//   return `${year}-${month}-${day}`
// }

import { formatDate } from '@utils/calendar'

describe('Calendar Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      // Arrange
      const date = new Date(2023, 0, 15) // January 15, 2023

      // Act
      const result = formatDate(date)

      // Assert
      expect(result).toBe('2023-01-15')
    })

    it('should pad single-digit month and day with zero', () => {
      // Arrange
      const date = new Date(2023, 0, 1) // January 1, 2023

      // Act
      const result = formatDate(date)

      // Assert
      expect(result).toBe('2023-01-01')
    })

    it('should handle different months correctly', () => {
      // Arrange
      const date = new Date(2023, 11, 25) // December 25, 2023

      // Act
      const result = formatDate(date)

      // Assert
      expect(result).toBe('2023-12-25')
    })
  })
})
