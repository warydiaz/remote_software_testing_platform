import { Inject } from '@nestjs/common';
import { CreateTestWithoutStepsCommand } from './create-test.command';
import { TestEntity } from '../../domain/test/test.entity';
import {
  TEST_REPOSITORY,
  TestRepository,
} from '../../domain/test/test.repository';

export class CreateTestWithoutStepsHandler {
  constructor(
    @Inject(TEST_REPOSITORY)
    private readonly testRepository: TestRepository,
  ) {}

  async handle(command: CreateTestWithoutStepsCommand): Promise<void> {
    const test = TestEntity.createWithoutSteps(
      command.id,
      command.testerId,
      command.title,
      command.description,
      command.priority,
      command.isAutomated,
      command.isRegression,
      command.requirement,
      command.sprint,
      command.expectedResult,
    );

    await this.testRepository.save(test);
  }
}
