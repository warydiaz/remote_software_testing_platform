import { InvalidFieldError } from '../invalid-field.error';

export class CompanyName {
  private constructor(readonly value: string) {}

  static create(name: string): CompanyName {
    if (!name) {
      throw InvalidFieldError.withInvalidField();
    }
    return new CompanyName(name);
  }
}
