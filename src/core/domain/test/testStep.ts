import { InvalidStepError } from './invalid-test-step.error';

export class TestStep {
  constructor(
    readonly order: number,
    readonly description: string,
    readonly expectedResult: string,
  ) {
    if (!description || !expectedResult || !order) {
      throw InvalidStepError.invalidStep();
    }
  }
}
