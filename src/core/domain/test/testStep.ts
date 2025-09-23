import { InvalidStepError } from './invalid-test-step.error';
import { TestId } from './id';

export class TestStep {
  constructor(
    readonly id: TestId,
    readonly order: number,
    readonly description: string,
    readonly expectedResult: string,
  ) {
    if (!description || !expectedResult || !order) {
      throw InvalidStepError.invalidStep();
    }
  }
}
