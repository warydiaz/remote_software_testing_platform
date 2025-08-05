/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BaseError } from '../../../error';

export class InvalidBirthDateError extends BaseError {
  private constructor(message: string) {
    super('invalid-birth-date', message);
  }

  static underAge(birthDate: Date): InvalidBirthDateError {
    return new InvalidBirthDateError(
      `Birth date indicates age under 18: ${birthDate}`,
    );
  }
}
