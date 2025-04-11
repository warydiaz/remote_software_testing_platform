export class LanguageEntity {
  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly name: string,
  ) {}

  static create(anId: number, aCode: string, aName: string): LanguageEntity {
    return new LanguageEntity(anId, aCode, aName);
  }
}
