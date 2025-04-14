export class ExperienceEntity {
  constructor(
    public readonly id: number,
    public readonly description: string,
  ) {}

  static create(anId: number, aDescription: string): ExperienceEntity {
    return new ExperienceEntity(anId, aDescription);
  }
}
