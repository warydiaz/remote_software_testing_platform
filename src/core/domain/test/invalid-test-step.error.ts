/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BaseError } from '../../../error';

export class InvalidStepError extends BaseError {
  private constructor(message: string) {
    super('invalid-test-step', message);
  }

  static invalidStep(): InvalidStepError {
    return new InvalidStepError(
      'Step description and expected result are required',
    );
  }
}
