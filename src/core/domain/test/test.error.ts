import { BaseError } from '../../../error';

export class TestError extends BaseError {
  private constructor(message: string) {
    super('test-error', message);
  }

  static withInvalidPriority(name: string): TestError {
    return new TestError(
      `Invalid priority value: ${name}, this must be: high, medium, low`,
    );
  }

  static withEmptyPriority(): TestError {
    return new TestError(`Test priority cannot be empty`);
  }

  static withInvalidTitle(): TestError {
    return new TestError(`Test title cannot be empty`);
  }
  static withInvalidDescription(): TestError {
    return new TestError(`Test description cannot be empty`);
  }

  static withEmptyRequirement(): TestError {
    return new TestError(`Test requirement cannot be empty`);
  }

  static withInvalidTestType(): TestError {
    return new TestError(`TestType must be a positive integer.`);
  }

  static withInvalidSprint(): TestError {
    return new TestError(`Test sprint cannot be empty`);
  }
}
