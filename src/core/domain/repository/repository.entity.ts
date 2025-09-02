import { TesterId } from '../tester/id';
import { RepositoryId } from './id';
import { RepositoryDescription } from './repositoryDescription';
import { RepositoryTitle } from './repositoryTitle';

export class RepositoryEntity {
  private constructor(
    public readonly id: RepositoryId,
    public readonly testerId: TesterId,
    public readonly title: RepositoryTitle,
    public readonly description: RepositoryDescription,
  ) {}

  static create(
    id: string,
    testerId: string,
    title: string,
    description: string,
  ): RepositoryEntity {
    return new RepositoryEntity(
      RepositoryId.create(id),
      TesterId.create(testerId),
      RepositoryTitle.create(title),
      RepositoryDescription.create(description),
    );
  }
}
