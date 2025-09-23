import { TestStep } from '../../domain/test/testStep';
interface CreateTestCommand {
  readonly id: string;
  readonly testerId: string;
  readonly title: string;
  readonly description: string;
  readonly priority: 'high' | 'medium' | 'low';
  readonly isAutomated: boolean;
  readonly isRegression: boolean;
  readonly requirement: string;
  readonly sprint: string;
}
export class CreateTestWithStepsCommand implements CreateTestCommand {
  constructor(
    readonly id: string,
    readonly testerId: string,
    readonly title: string,
    readonly description: string,
    readonly priority: 'high' | 'medium' | 'low',
    readonly isAutomated: boolean,
    readonly isRegression: boolean,
    readonly requirement: string,
    readonly sprint: string,
    readonly steps: TestStep[],
  ) {}
}

export class CreateTestWithoutStepsCommand implements CreateTestCommand {
  constructor(
    readonly id: string,
    readonly testerId: string,
    readonly title: string,
    readonly description: string,
    readonly priority: 'high' | 'medium' | 'low',
    readonly isAutomated: boolean,
    readonly isRegression: boolean,
    readonly requirement: string,
    readonly sprint: string,
    readonly expectedResult: string,
  ) {}
}
export class CreateExploratoryTestCommand implements CreateTestCommand {
  constructor(
    readonly id: string,
    readonly testerId: string,
    readonly title: string,
    readonly description: string,
    readonly priority: 'high' | 'medium' | 'low',
    readonly isAutomated: boolean,
    readonly isRegression: boolean,
    readonly requirement: string,
    readonly sprint: string,
  ) {}
}
