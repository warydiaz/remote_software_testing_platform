import { EmptyField } from './empty-field.error';

export class ProductDescription {
  constructor(readonly value: string) {}

  static create(value: string): ProductDescription {
    if (!value || value.trim().length === 0) {
      throw EmptyField.fieldNotValue('Description');
    }
    return new ProductDescription(value);
  }
}
