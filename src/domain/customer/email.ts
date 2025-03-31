import { InvalidEmailError } from './invalid-email.error';
import validator from 'validator';

export class Email {
  private constructor(readonly value: string) {}

  static create(email: string): Email {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!validator.isEmail(email)) {
      throw InvalidEmailError.withInvalidEmail(email);
    }

    return new Email(email);
  }
}
