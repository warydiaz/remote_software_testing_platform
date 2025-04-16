import { InvalidFieldError } from './invalid-field.error';

export class Name {
  private constructor(readonly value: string) {}

  static create(name: string): Name {
    if (!name) {
      throw InvalidFieldError.withInvalidField();
    }

    return new Name(name);
  }
}
