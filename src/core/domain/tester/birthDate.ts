import { InvalidBirthDateError } from './invalid-birthdate.error';

export class BirthDate {
  private constructor(readonly value: Date) {}

  static create(date: Date): BirthDate {
    if (!BirthDate.isOver18(date)) {
      throw InvalidBirthDateError.underAge(date);
    }

    return new BirthDate(date);
  }

  private static isOver18(date: Date): boolean {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );
    return date <= eighteenYearsAgo;
  }
}
