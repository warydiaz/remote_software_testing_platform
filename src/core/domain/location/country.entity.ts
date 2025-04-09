export class CountryEntity {
  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly name: string,
  ) {}

  static create(anId: number, aCode: string, aName: string): CountryEntity {
    return new CountryEntity(anId, aCode, aName);
  }
}
