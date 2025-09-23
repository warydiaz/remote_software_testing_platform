import { EmptyField } from './empty-field.error';

export class ProductName {
  constructor(readonly value: string) {}

  static create(value: string): ProductName {
    if (!value || value.trim().length === 0) {
      throw EmptyField.fieldNotValue('Name');
    }
    return new ProductName(value);
  }
}
