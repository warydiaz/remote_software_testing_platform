import { TestError } from './test.error';

export class TestPriority {
  private constructor(public readonly value: string) {}

  static create(priority: string): TestPriority {
    if (!priority || priority.trim().length === 0) {
      throw TestError.withEmptyPriority();
    }

    const validPriorities = ['high', 'medium', 'low'];
    if (!validPriorities.includes(priority.trim())) {
      throw TestError.withInvalidPriority(priority);
    }

    return new TestPriority(priority.trim());
  }
}
