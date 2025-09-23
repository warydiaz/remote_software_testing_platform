import { BaseError } from '../../../error';

export class EnvironmentNotFoundError extends BaseError {
  private constructor(message: string) {
    super('invalid-environment', message);
  }

  static emptyValue() {
    return new EnvironmentNotFoundError(`Environment value is required`);
  }
}
