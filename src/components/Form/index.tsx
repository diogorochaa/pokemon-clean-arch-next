'use client'
import FetchDataClient from '@/infra/http/FetchDataClient'
import SearchPokemonGatewayHttp from '@/infra/gateway/SearchPokemonGatewayHttp'
import { useState } from 'react'
import Pokemon from '@/application/domain/entities/Pokemon'
import SearchPokemon from '@/application/usecases/SearchPokemon'

function Form() {
  const [pokemomValue, setPokemonValue] = useState('')
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const seachPokemoGateway: SearchPokemonGatewayHttp = new SearchPokemonGatewayHttp(
    new FetchDataClient(),
  )
  const searchPokemon: SearchPokemon = new SearchPokemon(seachPokemoGateway)

  async function getPokemom() {
    try {
      setErrorMessage(null)
      const id = await searchPokemon.byName(pokemomValue)
      setPokemon(new Pokemon(id, pokemomValue))
    } catch (error) {
      setPokemon(null)
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
        {pokemon?.id && <span className="text-zinc-900">#{pokemon.id}</span>}
      </div>
      <div data-testid="pokemon-moves">
        <div data-testid="move-card">
          <div data-testid="move-name">Name</div>
          <div data-testid="move-accuracy">Accuracy</div>
          <div data-testid="move-power">Power</div>
          <div data-testid="move-pp">Priority</div>
          {pokemon?.getMoves().map((move, index) => (
            <div key={index}>
              <div data-testid={`move-name-${index + 1}`}>{move.name}</div>
              <div data-testid={`move-accuracy-${index + 1}`}>
                {move.accuracy}
              </div>
              <div data-testid={`move-power-${index + 1}`}>{move.power}</div>
              <div data-testid={`move-pp-${index + 1}`}>{move.priority}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export { Form }
