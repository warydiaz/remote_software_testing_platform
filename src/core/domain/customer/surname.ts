import { InvalidFieldError } from './invalid-field.error';
export class Surname {
  private constructor(readonly value: string) {}

  static create(surname: string): Surname {
    if (!surname) {
      throw InvalidFieldError.withInvalidField();
    }

    return new Surname(surname);
  }
}
