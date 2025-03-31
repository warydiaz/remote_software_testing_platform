import { BaseError } from '../../error';

export class InvalidSurnameError extends BaseError {
  private constructor(message: string) {
    super('invalid-surname surname', message);
  }

  static withInvalidSurName(name: string): InvalidSurnameError {
    return new InvalidSurnameError(`Invalid surname value: ${name}`);
  }
}
