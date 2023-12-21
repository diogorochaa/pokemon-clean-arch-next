import { render, fireEvent, act } from '@testing-library/react'
import { Form } from '@/components/Form'
import { describe, expect, test } from 'vitest'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

describe('Form', () => {
  test('should return pokemons id', async () => {
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
    expect(moveName1.textContent).toBe('mega-punch')
    expect(moveAccuracy1.textContent).toBe('85')
    expect(movePower1.textContent).toBe('80')
    expect(movePp1.textContent).toBe('0')
  })
})
