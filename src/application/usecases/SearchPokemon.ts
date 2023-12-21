import SearchPokemonGatewayHttp from '@/infra/gateway/SearchPokemonGatewayHttp'

export default class SearchPokemon {
  constructor(private readonly searchPokemonGatewayHttp: SearchPokemonGatewayHttp) {}

  async byName(name: string): Promise<number> {
    return this.searchPokemonGatewayHttp.byName(name)
  }
}
