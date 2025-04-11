import { InvalidFieldError } from './invalid-field.error';
export class TaxDomicile {
  private constructor(readonly value: string) {}

  static create(address: string): TaxDomicile {
    if (!address || address.trim().length === 0) {
      throw InvalidFieldError.withInvalidField();
    }
    return new TaxDomicile(address);
  }
}
