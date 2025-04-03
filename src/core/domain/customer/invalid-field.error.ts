import { BaseError } from '../../../error';

export class InvalidFieldError extends BaseError {
  private constructor(message: string) {
    super('invalid-field', message);
  }

  static withInvalidField(): InvalidFieldError {
    return new InvalidFieldError(
      `Validation failed: name, email, NIF are required fields`,
    );
  }
}
