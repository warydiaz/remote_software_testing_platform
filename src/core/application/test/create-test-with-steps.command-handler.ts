/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Inject } from '@nestjs/common';
import { TestStep } from '../../domain/test/testStep';
import { CreateTestWithStepsCommand } from './create-test.command';
import { TestEntity } from '../../domain/test/test.entity';
import {
  TEST_REPOSITORY,
  TestRepository,
} from '../../domain/test/test.repository';

export class CreateTestWithStepsHandler {
  constructor(
    @Inject(TEST_REPOSITORY)
    private readonly testRepository: TestRepository,
  ) {}

  async handle(command: CreateTestWithStepsCommand): Promise<void> {
    const domainSteps = this.getSteps(command.steps);

    const test = TestEntity.createWithSteps(
      command.id,
      command.title,
      command.description,
      command.priority,
      command.isAutomated,
      command.isRegression,
      command.requirement,
      command.sprint,
      domainSteps,
    );

    await this.testRepository.save(test);
  }

  private getSteps(steps: any[]): TestStep[] {
    return steps.map(
      (step) => new TestStep(step.order, step.description, step.expectedResult),
    );
  }
}
