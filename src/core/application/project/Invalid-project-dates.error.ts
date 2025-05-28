import { BaseError } from '../../../error';

export class InvalidProjectDatesError extends BaseError {
  private constructor(message: string) {
    super('invalid-project-dates', message);
  }

  static endDateBeforeStartDate(start: Date, end: Date) {
    return new InvalidProjectDatesError(
      `End date (${end.toISOString()}) cannot be before start date (${start.toISOString()})`,
    );
  }
}
