import { render, fireEvent, act } from '@testing-library/react'
import { Form } from '@/components/Form'
import { describe, expect, test } from 'vitest'
import SearchPokemonGateway from '@/application/usecases/SearchPokemon/SearchPokemonGateway.interface'
import SearchPokemonInput from '@/application/usecases/SearchPokemon/SearchPokemonInput'
import SearchPokemonOutput from '@/application/usecases/SearchPokemon/SearchPokemonOutput'
import GetMoveGateway from '@/application/usecases/GetMove/GetMoveGateway.interface'
import GetMoveInput from '@/application/usecases/GetMove/GetMoveInput'
import GetMoveOutput from '@/application/usecases/GetMove/GetMoveOutput'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe('Form', () => {
  test('should return pokemons id', async () => {
    const searchPokemonGateway: SearchPokemonGateway = {
      async byName(input: SearchPokemonInput): Promise<SearchPokemonOutput> { 
        return {
          id: 1,
          name: input.name,
          moveIds: [1],
        }
      }
    }
    const getMoveGateway: GetMoveGateway = {
      async byId(input: GetMoveInput): Promise<GetMoveOutput>  {
        return {
          id: input.id,
          name: `name-${input.id}`,
          accuracy: 100,
          power: 70,
          priority: 0,
        }
      }
    }
    const form = render(<Form />)

    act(() => {
      const inputElement = form.getByTestId('pokemon-search')
      fireEvent.change(inputElement, {
        target: { value: 'pikachu' },
      })
    })

    act(() => {
      const buttonElement = form.getByTestId('pokemon-search-button')
      fireEvent.click(buttonElement)
    })

    await sleep(1200)

    const pokemonIdElement = form.getByTestId('pokemon-id')
    const errorMessageElement = form.getByTestId('error-message')

    expect(pokemonIdElement.textContent).toBe('#25')
    expect(errorMessageElement.textContent).toBeFalsy()

  })

  test('should return error message', async () => {
    const form = render(<Form />)

    act(() => {
      const inputElement = form.getByTestId('pokemon-search')
      fireEvent.change(inputElement, {
        target: { value: 'pikaju' },
      })
    })

    act(() => {
      const buttonElement = form.getByTestId('pokemon-search-button')
      fireEvent.click(buttonElement)
    })

    await sleep(1000)

    const pokemonIdElement = form.getByTestId('pokemon-id')
    const errorMessageElement = form.getByTestId('error-message')

    expect(pokemonIdElement.textContent).toBeFalsy()
    expect(errorMessageElement.textContent).toBeTruthy()
  })

  test('should clean id from existing pokemon previous search', async () => {
    const form = render(<Form />)

    act(() => {
      const inputElement = form.getByTestId('pokemon-search')
      fireEvent.change(inputElement, {
        target: { value: 'pikachu' },
      })
    })

    act(() => {
      const buttonElement = form.getByTestId('pokemon-search-button')
      fireEvent.click(buttonElement)
    })

    await sleep(1000)
    const pokemonIdElement1 = form.getByTestId('pokemon-id')
    const errorMessageElement1 = form.getByTestId('error-message')

    expect(pokemonIdElement1.textContent).toBe('#25')
    expect(errorMessageElement1.textContent).toBeFalsy()

    act(() => {
      const inputElement = form.getByTestId('pokemon-search')
      fireEvent.change(inputElement, {
        target: { value: 'pikaju' },
      })
    })

    act(() => {
      const buttonElement = form.getByTestId('pokemon-search-button')
      fireEvent.click(buttonElement)
    })

    await sleep(1000)

    const pokemonIdElement = form.getByTestId('pokemon-id')
    const errorMessageElement = form.getByTestId('error-message')

    expect(pokemonIdElement.textContent).toBeFalsy()
    expect(errorMessageElement).toBeTruthy()
  })

  test('should display pokemon moves', async () => {
    const form = render(<Form />)

    act(() => {
      const inputElement = form.getByTestId('pokemon-search')
      fireEvent.change(inputElement, {
        target: { value: 'pikachu' },
      })
    })

    act(() => {
      const buttonElement = form.getByTestId('pokemon-search-button')
      fireEvent.click(buttonElement)
    })

    await sleep(1000)

    const pokemonMovesElement = form.getByTestId('pokemon-moves')
    const errorMessageElement = form.getByTestId('error-message')
    const moveName = form.getByTestId('move-name')
    const moveAccuracy = form.getByTestId('move-accuracy')
    const movePower = form.getByTestId('move-power')
    const movePp = form.getByTestId('move-pp')
    const moveName1 = form.getByTestId('move-name-1')
    const moveAccuracy1 = form.getByTestId('move-accuracy-1')
    const movePower1 = form.getByTestId('move-power-1')
    const movePp1 = form.getByTestId('move-pp-1')

    expect(pokemonMovesElement.textContent).toBeTruthy()
    expect(errorMessageElement.textContent).toBeFalsy()
    expect(moveName.textContent).toBe('Name')
    expect(moveAccuracy.textContent).toBe('Accuracy')
    expect(movePower.textContent).toBe('Power')
    expect(movePp.textContent).toBe('Priority')
    
  })
})
