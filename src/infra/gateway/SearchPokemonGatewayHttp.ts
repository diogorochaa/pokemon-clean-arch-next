import SearchPokemonInput from '@/application/usecases/SearchPokemon/SearchPokemonInput'
import SearchPokemonOutput from '@/application/usecases/SearchPokemon/SearchPokemonOutput'
import HttpClient from '@/infra/http/HttpClient.interface'

export default class SearchPokemonGatewayHttp {

  constructor(readonly httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async byName(input: SearchPokemonInput): Promise<SearchPokemonOutput> {
    const response = await this.httpClient.get(
      `https://pokeapi.co/api/v2/pokemon/${input.name}`,
    )
    if (response.detail === 'Not found.') {
      throw new Error('Not Found')
    }
    const moveIds = response.moves.map((move: any) => {
      let url = move.move.url.trim().split('/')
      return parseInt(url[url.length - 2])
    }) 
    
    return {
      id: response.id,
      name: response.name,
      moveIds: moveIds,
    }
  }
}
