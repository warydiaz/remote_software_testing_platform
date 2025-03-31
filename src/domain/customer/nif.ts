import { InvalidNIFError } from './invalid-nif.error';

export class NIF {
  private constructor(readonly value: string) {}

  static create(nif: string): NIF {
    if (!/^[A-Za-z0-9]{8,12}$/.test(nif)) {
      throw InvalidNIFError.withInvalidNIF(nif);
    }
    return new NIF(nif);
  }
}
