import { BaseError } from '../../../error';

export class InvalidPriorityError extends BaseError {
  private constructor(message: string) {
    super('invalid-test-priority', message);
  }

  static withEmptyPriority(): InvalidPriorityError {
    return new InvalidPriorityError('Step priority is required');
  }

  static withInvalidPriority(priority: string): InvalidPriorityError {
    return new InvalidPriorityError(
      `Step priority must be one of the following values: high, medium, low. Received: ${priority}`,
    );
  }
}
