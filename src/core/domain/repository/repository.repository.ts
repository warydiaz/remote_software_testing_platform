import { TesterId } from '../tester/id';
import { RepositoryId } from './id';
import { RepositoryEntity } from './repository.entity';
import { RepositoryTitle } from './repositoryTitle';

export interface RepositoryRepository {
  save(repository: RepositoryEntity): Promise<void>;
  findById(id: RepositoryId): Promise<RepositoryEntity | undefined>;
  findAll(): Promise<RepositoryEntity[]>;
  findByTitleAndTesterId(
    title: RepositoryTitle,
    testerId: TesterId,
  ): Promise<RepositoryEntity | undefined>;
  deleteById(id: RepositoryId): Promise<void>;
  update(repository: RepositoryEntity): Promise<void>;
  findByName(name: string): Promise<RepositoryEntity | undefined>;
}

export const REPOSITORY_REPOSITORY = Symbol('RepositoryRepository');
