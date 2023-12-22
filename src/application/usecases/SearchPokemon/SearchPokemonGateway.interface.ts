import SearchPokemonInput from "./SearchPokemonInput";
import SearchPokemonOutput from "./SearchPokemonOutput";

export default interface SearchPokemonGateway {
  byName(input: SearchPokemonInput): Promise<SearchPokemonOutput>;
}