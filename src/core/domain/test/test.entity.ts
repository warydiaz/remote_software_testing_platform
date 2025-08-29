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
    public readonly title: TestTitle,
    public readonly description: TestDescription,
    public readonly priority: TestPriority,
    public readonly isAutomated: boolean,
    public readonly isRegression: boolean,
    public readonly requirement: TestRequirement | undefined,
    public readonly sprint: TestSprint | undefined,
    public readonly expectedResult: string | undefined,
    public readonly steps: TestStep[] | undefined,
    public readonly isExploratory: boolean = false,
  ) {}

  static createWithoutSteps(
    id: string,
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
      TestTitle.create(title),
      TestDescription.create(description),
      TestPriority.create(priority),
      isAutomated,
      isRegression,
      requirement ? TestRequirement.create(requirement) : undefined,
      sprint ? TestSprint.create(sprint) : undefined,
      expectedResult,
      [],
      false,
    );
  }

  static createWithSteps(
    id: string,
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
      TestTitle.create(title),
      TestDescription.create(description),
      TestPriority.create(priority),
      isAutomated,
      isRegression,
      requirement ? TestRequirement.create(requirement) : undefined,
      sprint ? TestSprint.create(sprint) : undefined,
      undefined,
      steps,
      false,
    );
  }

  static createExploratory(
    id: string,
    title: string,
    description: string,
    priority: string,
    isAutomated: boolean,
    isRegression: boolean,
    requirement?: string,
    sprint?: string,
  ): TestEntity {
    return new TestEntity(
      TestId.create(id),
      TestTitle.create(title),
      TestDescription.create(description),
      TestPriority.create(priority),
      isAutomated,
      isRegression,
      requirement ? TestRequirement.create(requirement) : undefined,
      sprint ? TestSprint.create(sprint) : undefined,
      undefined,
      [],
      true,
    );
  }
}
