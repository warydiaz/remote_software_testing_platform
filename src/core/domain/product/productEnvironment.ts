import { EmptyField } from './empty-field.error';

export class ProductEnvironment {
  constructor(readonly value: string) {}

  static create(value: string): ProductEnvironment {
    if (!value || value.trim().length === 0) {
      throw EmptyField.fieldNotValue('Environment');
    }
    return new ProductEnvironment(value);
  }
}
