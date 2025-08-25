import { Id } from '../id';

export class ProductId extends Id {
  constructor(value: string) {
    super(value);
  }

  static create(value: string): ProductId {
    this.guardValidId(value);
    return new ProductId(value);
  }

  static new(): ProductId {
    return new ProductId(Id.generate());
  }
}
