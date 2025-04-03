import { InvalidEmailError } from './invalid-email.error';
import validator from 'validator';
import { InvalidFieldError } from './invalid-field.error';

export class Email {
  private constructor(readonly value: string) {}

  static create(email: string): Email {
    if (!email) {
      throw InvalidFieldError.withInvalidField();
    }

    if (!validator.isEmail(email)) {
      throw InvalidEmailError.withInvalidEmail(email);
    }

    return new Email(email);
  }
}
