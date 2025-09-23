import { TestError } from './test.error';

export class TestTitle {
  private constructor(public readonly value: string) {}

  static create(title: string): TestTitle {
    if (!title || title.trim().length === 0) {
      throw TestError.withInvalidTitle();
    }
    return new TestTitle(title.trim());
  }
}
