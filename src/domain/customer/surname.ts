import { InvalidSurnameError } from './invalid-surname.error';

export class Surname {
  private constructor(readonly value: string) {}

  static create(surname: string): Surname {
    if (surname.length === 0) {
      throw InvalidSurnameError.withInvalidSurName(surname);
    }

    return new Surname(surname);
  }
}
