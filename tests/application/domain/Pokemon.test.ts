import Pokemon from '@/application/domain/entities/Pokemon'
import { describe, expect, test } from 'vitest'

describe('Pokemon', async () => {
  test('should have an id', async () => {
    const pokemon: Pokemon = new Pokemon(1, 'Grass')
    expect(pokemon.id).toBe(1)
    expect(pokemon.name).toBe('Grass')
  })

  test('should have some moves', async () => {
    const pokemon: Pokemon = new Pokemon(1, 'Grass')
    pokemon.addMove({
      id: 1,
      name: 'Tackle',
      accuracy: 100,
      power: 40,
      priority: 0,
    })
    pokemon.addMove({
      id: 2,
      name: 'Growl',
      accuracy: 100,
      power: 0,
      priority: 0,
    })
    expect(pokemon.id).toBe(1)
    expect(pokemon.name).toBe('Grass')
    expect(pokemon.getMoves()).toHaveLength(2)
  })
})
