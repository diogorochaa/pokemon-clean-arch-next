import Move from './Move'

export default class Pokemon {
  private moves: Move[] = []

  constructor(
    public readonly id: number,
    readonly name: string,
  ) {}

  addMove(move: Move) {
    this.moves.push(move)
  }

  getMoves(): Move[] {
    return this.moves
  }
}
