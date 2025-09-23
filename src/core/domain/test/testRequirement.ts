import { TestError } from './test.error';

export class TestRequirement {
  private constructor(public readonly value: string) {}

  static create(requirement: string): TestRequirement {
    if (!requirement || requirement.trim().length === 0) {
      throw TestError.withEmptyRequirement();
    }

    return new TestRequirement(requirement.trim());
  }
}
