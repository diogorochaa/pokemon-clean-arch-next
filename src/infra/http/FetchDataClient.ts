import HttpClient from './HttpClient.interface'

export default class FetchDataClient implements HttpClient {
  async get(url: string): Promise<any> {
    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      return { detail: 'Not found.' }
    }
  }
}
