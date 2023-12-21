import FetchDataClient from '@/infra/http/FetchDataClient'
import SearchPokemonGatewayHttp from '@/infra/gateway/SearchPokemonGatewayHttp'
import { describe, expect, test } from 'vitest'

describe('SearchPokemonGatewayHttp', async () => {
  test('should return a pokemon', async () => {
    const gateway: SearchPokemonGatewayHttp = new SearchPokemonGatewayHttp(
      new FetchDataClient(),
    )
    const id: number = await gateway.byName('pikachu')

    expect(id).toBe(25)
  })

  test('should return error when pokemon is not found', async () => {
    const gateway: SearchPokemonGatewayHttp = new SearchPokemonGatewayHttp(
      new FetchDataClient(),
    )
    await expect(gateway.byName('pichuleco')).rejects.toThrow('Not Found')
  })
})
