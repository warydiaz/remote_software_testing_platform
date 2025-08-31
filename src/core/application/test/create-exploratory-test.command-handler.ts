import { Inject } from '@nestjs/common';
import { CreateExploratoryTestCommand } from './create-test.command';
import { TestEntity } from '../../domain/test/test.entity';
import {
  TEST_REPOSITORY,
  TestRepository,
} from '../../domain/test/test.repository';

export class CreateExploratoryTestHandler {
  constructor(
    @Inject(TEST_REPOSITORY)
    private readonly testRepository: TestRepository,
  ) {}

  async handle(command: CreateExploratoryTestCommand): Promise<void> {
    const test = TestEntity.createExploratory(
      command.id,
      command.title,
      command.description,
      command.priority,
      command.isAutomated,
      command.isRegression,
      command.requirement,
      command.sprint,
    );

    await this.testRepository.save(test);
  }
}
