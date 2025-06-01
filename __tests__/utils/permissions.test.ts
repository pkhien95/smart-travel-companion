import { formatTemp } from '../../app/utils/common'

describe('Common Utils', () => {
  describe('formatTemp', () => {
    it('should format temperature correctly with positive value', () => {
      // Arrange
      const temp = 25

      // Act
      const result = formatTemp(temp)

      // Assert
      expect(result).toBe('25°C')
    })

    it('should format temperature correctly with negative value', () => {
      // Arrange
      const temp = -10

      // Act
      const result = formatTemp(temp)

      // Assert
      expect(result).toBe('-10°C')
    })

    it('should format temperature correctly with zero', () => {
      // Arrange
      const temp = 0

      // Act
      const result = formatTemp(temp)

      // Assert
      expect(result).toBe('0°C')
    })

    it('should format temperature correctly with decimal value', () => {
      // Arrange
      const temp = 22.5

      // Act
      const result = formatTemp(temp)

      // Assert
      expect(result).toBe('22.5°C')
    })
  })
})
