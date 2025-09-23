import { TesterId } from '../tester/id';
import { TestId } from './id';
import { TestDescription } from './testDescription';
import { TestPriority } from './testPriority';
import { TestRequirement } from './testRequirement';
import { TestSprint } from './testSprint';
import { TestStep } from './testStep';
import { TestTitle } from './testTitle';

export class TestEntity {
  private constructor(
    public readonly id: TestId,
    public readonly testerId: TesterId,
    public readonly title: TestTitle,
    public readonly description: TestDescription,
    public readonly priority: TestPriority,
    public readonly isAutomated: boolean,
    public readonly isRegression: boolean,
    public readonly requirement: TestRequirement,
    public readonly sprint: TestSprint,
    public readonly expectedResult: string | undefined,
    public readonly steps: TestStep[],
    public readonly isExploratory: boolean = false,
  ) {}

  static createWithoutSteps(
    id: string,
    testerId: string,
    title: string,
    description: string,
    priority: string,
    isAutomated: boolean,
    isRegression: boolean,
    requirement: string,
    sprint: string,
    expectedResult: string,
  ): TestEntity {
    return new TestEntity(
      TestId.create(id),
      TesterId.create(testerId),
      TestTitle.create(title),
      TestDescription.create(description),
      TestPriority.create(priority),
      isAutomated,
      isRegression,
      TestRequirement.create(requirement),
      TestSprint.create(sprint),
      expectedResult,
      [],
      false,
    );
  }

  static createWithSteps(
    id: string,
    testerId: string,
    title: string,
    description: string,
    priority: string,
    isAutomated: boolean,
    isRegression: boolean,
    requirement: string,
    sprint: string,
    steps: TestStep[],
  ): TestEntity {
    return new TestEntity(
      TestId.create(id),
      TesterId.create(testerId),
      TestTitle.create(title),
      TestDescription.create(description),
      TestPriority.create(priority),
      isAutomated,
      isRegression,
      TestRequirement.create(requirement),
      TestSprint.create(sprint),
      undefined,
      steps,
      false,
    );
  }

  static createExploratory(
    id: string,
    testerId: string,
    title: string,
    description: string,
    priority: string,
    isAutomated: boolean,
    isRegression: boolean,
    requirement: string,
    sprint: string,
  ): TestEntity {
    return new TestEntity(
      TestId.create(id),
      TesterId.create(testerId),
      TestTitle.create(title),
      TestDescription.create(description),
      TestPriority.create(priority),
      isAutomated,
      isRegression,
      TestRequirement.create(requirement),
      TestSprint.create(sprint),
      undefined,
      [],
      true,
    );
  }
}
