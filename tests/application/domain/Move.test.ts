import Move from '@/application/domain/entities/Move'
import { expect } from 'vitest'

describe('Move', async () => {
  test('should have an id', async () => {
    const move: Move = new Move(1, 'Grass', 100, 40, 0)
    expect(move.id).toBe(1)
    expect(move.name).toBe('Grass')
    expect(move.accuracy).toBe(100)
    expect(move.power).toBe(40)
    expect(move.priority).toBe(0)
  })
})
