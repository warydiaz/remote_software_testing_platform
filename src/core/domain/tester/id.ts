import { Id } from '../id';

export class TesterId extends Id {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): TesterId {
    this.guardValidId(value);
    return new TesterId(value);
  }

  static new(): TesterId {
    return new TesterId(Id.generate());
  }
}
