import { InvalidNameError } from './invalid-name.error';

export class Name {
  private constructor(readonly value: string) {}

  static create(name: string): Name {
    if (name.length === 0) {
      throw InvalidNameError.withInvalidName(name);
    }

    return new Name(name);
  }
}
