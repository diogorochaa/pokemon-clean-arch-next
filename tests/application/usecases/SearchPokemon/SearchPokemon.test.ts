import { describe, expect } from "vitest";
import SearchPokemonGateway  from '@/application/usecases/SearchPokemon/SearchPokemonGateway.interface';
import SearchPokemon from "@/application/usecases/SearchPokemon/SearchPokemon";
import SearchPokemonGatewayHttp from '@/infra/gateway/SearchPokemonGatewayHttp';
import HttpClient from "@/infra/http/HttpClient.interface";
import FetchDataClient from "@/infra/http/FetchDataClient";
import Pokemon from "@/application/domain/entities/Pokemon";
import GetMoveGateway from "@/application/usecases/GetMove/GetMoveGateway.interface";
import GetMoveGatewayHttps from "@/infra/gateway/GetMoveGatewayHttp";

describe("SearchPokemon", async () => {
  test("should return a pokemon", async () => {
    const httpClient: HttpClient = new FetchDataClient()
    const getMoveGateway: GetMoveGateway = new GetMoveGatewayHttps(httpClient)
    const searchPokemonGateway: SearchPokemonGateway = new SearchPokemonGatewayHttp(httpClient)
    const searchPokemon: SearchPokemon = new SearchPokemon(searchPokemonGateway, getMoveGateway)

    const pokemon: Pokemon = await searchPokemon.byName("pichu", 2)

    expect(pokemon.id).toBe(172)
    expect(pokemon.name).toBe("pichu")
    const moves = pokemon.getMoves()
    expect(moves).toHaveLength(2)
    expect(moves[0].id).toBe(3)
    expect(moves[0].name).toBe("double-slap")
    expect(moves[0].accuracy).toBe(85)
    expect(moves[0].power).toBe(15)
    expect(moves[0].priority).toBe(0)
    expect(moves[1].id).toBe(5)
    expect(moves[1].name).toBe("mega-punch")
    expect(moves[1].accuracy).toBe(85)
    expect(moves[1].power).toBe(80)
    expect(moves[1].priority).toBe(0)

  }
  );
})