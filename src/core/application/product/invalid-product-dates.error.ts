import { BaseError } from '../../../error';

export class InvalidProductDatesError extends BaseError {
  private constructor(message: string) {
    super('invalid-products-dates', message);
  }

  static endDateBeforeStartDate(start: Date, end: Date) {
    return new InvalidProductDatesError(
      `End date (${end.toISOString()}) cannot be before start date (${start.toISOString()})`,
    );
  }

  static outsideProjectDates(
    projectStart: Date,
    projectEnd: Date,
    productStart: Date,
    productEnd: Date,
  ) {
    return new InvalidProductDatesError(
      `Product dates (${productStart.toDateString()} - ${productEnd.toDateString()}) are outside project dates (${projectStart.toDateString()} - ${projectEnd.toDateString()})`,
    );
  }
}
