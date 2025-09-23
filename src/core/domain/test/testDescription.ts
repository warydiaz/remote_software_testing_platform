import { TestError } from './test.error';

export class TestDescription {
  private constructor(public readonly value: string) {}

  static create(description: string): TestDescription {
    if (!description || description.trim().length === 0) {
      throw TestError.withInvalidDescription();
    }
    return new TestDescription(description.trim());
  }
}
