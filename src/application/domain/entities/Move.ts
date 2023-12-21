export default class Move {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly accuracy: number,
    readonly power: number,
    readonly priority: number,
  ) {}
}
