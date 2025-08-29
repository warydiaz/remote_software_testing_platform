import { TestError } from './test.error';

export class TestSprint {
  private constructor(public readonly value: string) {}

  static create(description: string): TestSprint {
    if (!description || description.trim().length === 0) {
      throw TestError.withInvalidSprint();
    }
    return new TestSprint(description.trim());
  }
}
