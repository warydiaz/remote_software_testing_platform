import { BaseError } from '../../../error';

export class InvalidNameError extends BaseError {
  private constructor(message: string) {
    super('invalid-name name', message);
  }

  static withInvalidName(name: string): InvalidNameError {
    return new InvalidNameError(`Invalid name value: ${name}`);
  }
}
