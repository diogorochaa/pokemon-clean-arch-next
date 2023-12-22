import GetMoveGateway from "@/application/usecases/GetMove/GetMoveGateway.interface";
import HttpClient from "../http/HttpClient.interface";
import GetMoveInput from "@/application/usecases/GetMove/GetMoveInput";
import GetMoveOutput from "@/application/usecases/GetMove/GetMoveOutput";

export default class GetMoveGatewayHttps implements GetMoveGateway {

  constructor(readonly httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async byId(input: GetMoveInput): Promise<GetMoveOutput> {
    const response = await this.httpClient.get(`https://pokeapi.co/api/v2/move/${input.id}`)
    return {
      id: response.id,
      name: response.name,
      accuracy: response.accuracy,
      power: response.power,
      priority: response.priority
    }
  }
}