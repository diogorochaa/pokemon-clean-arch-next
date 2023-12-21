import HttpClient from '@/infra/http/HttpClient.interface'

export default class SearchPokemonGatewayHttp {
  private httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async byName(name: string | undefined): Promise<number> {
    const response = await this.httpClient.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    )
    if (response.detail === 'Not found.') {
      throw new Error('Not Found')
    }
    return response.id
  }
}
