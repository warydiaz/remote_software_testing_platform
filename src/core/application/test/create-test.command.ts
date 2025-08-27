import { TestStep } from 'src/core/domain/test/testStep';
// Base interface
interface CreateTestCommand {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  isAutomated: boolean;
  isRegression: boolean;
  testPlanId: number;
  requirement: string;
  sprint: string;
}

// For "with steps"
export class CreateTestWithStepsCommand implements CreateTestCommand {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly priority: 'high' | 'medium' | 'low',
    readonly isAutomated: boolean,
    readonly isRegression: boolean,
    readonly testPlanId: number,
    readonly requirement: string,
    readonly sprint: string,
    readonly steps: TestStep[],
  ) {}
}

// For "without steps"
export class CreateTestWithoutStepsCommand implements CreateTestCommand {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly priority: 'high' | 'medium' | 'low',
    readonly isAutomated: boolean,
    readonly isRegression: boolean,
    readonly testPlanId: number,
    readonly requirement: string,
    readonly sprint: string,
    readonly expectedResult: string,
  ) {}
}

// For "exploratory"
export class CreateExploratoryTestCommand implements CreateTestCommand {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly priority: 'high' | 'medium' | 'low',
    readonly isAutomated: boolean,
    readonly isRegression: boolean,
    readonly testPlanId: number,
    readonly requirement: string,
    readonly sprint: string,
  ) {}
}
