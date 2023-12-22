import FetchDataClient from '@/infra/http/FetchDataClient'
import SearchPokemonGatewayHttp from '@/infra/gateway/SearchPokemonGatewayHttp'
import { describe, expect, test } from 'vitest'
import SearchPokemonOutput from '@/application/usecases/SearchPokemon/SearchPokemonOutput'

describe('SearchPokemonGatewayHttp', async () => {
  test('should return a pokemon', async () => {
    const gateway: SearchPokemonGatewayHttp = new SearchPokemonGatewayHttp(
      new FetchDataClient(),
    )
    const output: SearchPokemonOutput = await gateway.byName({ name: 'pikachu'})

    expect(output.id).toBe(25)
  })

  test('should return error when pokemon is not found', async () => {
    const gateway: SearchPokemonGatewayHttp = new SearchPokemonGatewayHttp(
      new FetchDataClient(),
    )
    await expect(gateway.byName({ name: 'pichuleco' })).rejects.toThrow('Not Found')
  })
})
