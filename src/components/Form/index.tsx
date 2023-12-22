'use client'
import FetchDataClient from '@/infra/http/FetchDataClient'
import SearchPokemonGatewayHttp from '@/infra/gateway/SearchPokemonGatewayHttp'
import { useState } from 'react'
import Pokemon from '@/application/domain/entities/Pokemon'
import SearchPokemon from '@/application/usecases/SearchPokemon/SearchPokemon'
import SearchPokemonGateway from '@/application/usecases/SearchPokemon/SearchPokemonGateway.interface'
import GetMoveGateway from '@/application/usecases/GetMove/GetMoveGateway.interface'
import GetMoveGatewayHttps from '@/infra/gateway/GetMoveGatewayHttp'

function Form() {
  const [pokemomValue, setPokemonValue] = useState('')
  const [pokemonRef, setPokemonRef] = useState<Pokemon | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const seachPokemoGateway: SearchPokemonGateway = new SearchPokemonGatewayHttp(
    new FetchDataClient(),
  )
  const getMoveGateway: GetMoveGateway = new GetMoveGatewayHttps(new FetchDataClient)
  const searchPokemon: SearchPokemon = new SearchPokemon(seachPokemoGateway, getMoveGateway)

  async function getPokemom() {
    try {
      setErrorMessage(null)
      const pokemon: Pokemon = await searchPokemon.byName(pokemomValue, 4)
      setPokemonRef(pokemon)
    } catch (error) {
      setPokemonRef(null)
      setErrorMessage(error.message)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input
        value={pokemomValue}
        data-testid="pokemon-search"
        type="text"
        placeholder="Enter pokemom name"
        onChange={(event) => setPokemonValue(event.target.value)}
      />
      <button data-testid="pokemon-search-button" onClick={getPokemom}>
        Search
      </button>
      <div data-testid="error-message">
        {errorMessage && <span className="text-zinc-900">{errorMessage}</span>}
      </div>
      <div data-testid="pokemon-id">
        {pokemonRef?.id && <span className="text-zinc-900">#{pokemonRef.id}</span>}
      </div>
      <div data-testid="pokemon-moves">
        <div data-testid="move-card">
          <div data-testid="move-name">Name</div>
          <div data-testid="move-accuracy">Accuracy</div>
          <div data-testid="move-power">Power</div>
          <div data-testid="move-pp">Priority</div>
          {pokemonRef?.getMoves().map((move, index) => (
            <div key={index}>
              <div data-testid={`move-name-${index}`}>{move.name}</div>
              <div data-testid={`move-accuracy-${index}`}>{move.accuracy}</div>
              <div data-testid={`move-power-${index}`}>{move.power}</div>
              <div data-testid={`move-pp-${index}`}>{move.priority}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export { Form }
