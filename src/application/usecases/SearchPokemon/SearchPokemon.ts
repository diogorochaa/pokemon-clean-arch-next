import Move from "@/application/domain/entities/Move";
import Pokemon from "../../domain/entities/Pokemon";
import SearchPokemonGateway from "./SearchPokemonGateway.interface";
import SearchPokemonOutput from "./SearchPokemonOutput";
import GetMoveOutput from "../GetMove/GetMoveOutput";
import GetMoveGateway from "../GetMove/GetMoveGateway.interface";


export default class SearchPokemon {
  constructor(private readonly searchPokemonGatewayHttp: SearchPokemonGateway, readonly getMoveGatewayHttps: GetMoveGateway) {}

  async byName(name: string, quantity: number): Promise<Pokemon> {
    const output: SearchPokemonOutput = await this.searchPokemonGatewayHttp.byName({name})
    let movePromises: Promise<GetMoveOutput>[] = []
    if (output.moveIds) {
      movePromises = output.moveIds.slice(0, quantity).map(async (id: number) => {
        return this.getMoveGatewayHttps.byId({id})
      })
    }
    const movesOutputs: GetMoveOutput[] = await Promise.all(movePromises)
    const pokemon = new Pokemon(output.id, output.name)
    movesOutputs.forEach((output) => {
      pokemon.addMove(new Move(output.id, output.name, output.accuracy, output.power, output.priority))
    })
    return pokemon
  }
}
