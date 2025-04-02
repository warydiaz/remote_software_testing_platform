import { InvalidTaxDomicileError } from './invalid-tax-domicile.error';

export class TaxDomicile {
  private constructor(readonly value: string) {}

  static create(address: string): TaxDomicile {
    if (address.trim().length === 0) {
      throw InvalidTaxDomicileError.withInvalidAddress(address);
    }
    return new TaxDomicile(address);
  }
}
