export class InterestEntity {
  constructor(
    public readonly id: number,
    public readonly description: string,
  ) {}

  static create(anId: number, aDescription: string): InterestEntity {
    return new InterestEntity(anId, aDescription);
  }
}
