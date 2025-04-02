import { BaseError } from '../../../error';

export class InvalidTaxDomicileError extends BaseError {
  private constructor(message: string) {
    super('invalid-tax domicile', message);
  }

  static withInvalidAddress(address: string): InvalidTaxDomicileError {
    return new InvalidTaxDomicileError(`Invalid tax domicile: ${address}`);
  }
}
