import { BaseError } from '../../error';

export class InvalidCompanyNameError extends BaseError {
  private constructor(message: string) {
    super('invalid-company name', message);
  }

  static withInvalidName(name: string): InvalidCompanyNameError {
    return new InvalidCompanyNameError(`Invalid company value: ${name}`);
  }
}
