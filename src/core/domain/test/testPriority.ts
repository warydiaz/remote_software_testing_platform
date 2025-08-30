import { InvalidPriorityError } from './invalid-test-priority.error';

export type PriorityType = 'high' | 'medium' | 'low';

export class TestPriority {
  private constructor(public readonly value: PriorityType) {}

  static create(priority: string): TestPriority {
    if (!priority || priority.trim().length === 0) {
      throw InvalidPriorityError.withEmptyPriority();
    }

    const validPriorities: PriorityType[] = ['high', 'medium', 'low'];
    const normalized = priority.trim() as PriorityType;

    if (!validPriorities.includes(normalized)) {
      throw InvalidPriorityError.withInvalidPriority(priority);
    }

    return new TestPriority(normalized);
  }
}
