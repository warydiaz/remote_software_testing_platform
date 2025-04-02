import { BaseError } from '../../../error';

export class InvalidNIFError extends BaseError {
  private constructor(message: string) {
    super('invalid-nif', message);
  }

  static withInvalidNIF(nif: string): InvalidNIFError {
    return new InvalidNIFError(`Invalid NIF: ${nif}`);
  }
}
