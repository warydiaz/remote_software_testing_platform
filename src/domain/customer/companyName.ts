import { InvalidCompanyNameError } from './invalid-company-name.error';

export class CompanyName {
  private constructor(readonly value: string) {}

  static create(name: string): CompanyName {
    if (name.trim().length === 0) {
      throw InvalidCompanyNameError.withInvalidName(name);
    }
    return new CompanyName(name);
  }
}
