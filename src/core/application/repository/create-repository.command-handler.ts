import { Inject } from '@nestjs/common';
import { CreateRepositoryCommand } from './create-repository.command';
import { RepositoryAlreadyExistsError } from './customer-repository-exists.error';
import {
  REPOSITORY_REPOSITORY,
  RepositoryRepository,
} from '../../domain/repository/repository.repository';
import { RepositoryEntity } from '../../domain/repository/repository.entity';
import { RepositoryTitle } from '../../domain/repository/repositoryTitle';
import { TesterId } from '../../domain/tester/id';

export class CreateRepositoryHandler {
  constructor(
    @Inject(REPOSITORY_REPOSITORY)
    private readonly repositoryRepository: RepositoryRepository,
  ) {}

  async handle(command: CreateRepositoryCommand): Promise<void> {
    const title = RepositoryTitle.create(command.title);
    const testerId = TesterId.create(command.tester_id);

    const existRepository =
      await this.repositoryRepository.findByTitleAndTesterId(title, testerId);

    if (existRepository) {
      throw RepositoryAlreadyExistsError.withTitle(command.title);
    }

    const repository = RepositoryEntity.create(
      command.id,
      command.tester_id,
      command.title,
      command.description,
    );

    await this.repositoryRepository.save(repository);
  }
}
