import { Id } from '../id';

export class TestId extends Id {
  constructor(value: string) {
    super(value);
  }

  static create(value: string): TestId {
    this.guardValidId(value);
    return new TestId(value);
  }

  static new(): TestId {
    return new TestId(Id.generate());
  }
}
