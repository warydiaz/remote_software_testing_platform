import { InvalidStepError } from './invalid-test-step.error';

export class TestStep {
  constructor(
    readonly description: string,
    readonly expectedResult: string,
  ) {
    if (!description || !expectedResult) {
      throw InvalidStepError.invalidStep();
    }
  }
}
