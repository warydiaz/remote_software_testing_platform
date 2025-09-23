import { RepositoryId } from '../repository/id';
import { FolderDescription } from './folderDescription';
import { FolderPath } from './folderPath';
import { FolderTitle } from './folderTitle';
import { FolderId } from './id';
import { TesterId } from '../tester/id';

export class FolderEntity {
  private constructor(
    public readonly id: FolderId,
    public readonly title: FolderTitle,
    public readonly testerId: TesterId,
    public readonly repositoryId: RepositoryId,
    public readonly description: FolderDescription,
    public readonly path: FolderPath,
  ) {}

  static create(
    id: string,
    title: string,
    testerId: string,
    repositoryId: string,
    path: string,
    description: string,
  ): FolderEntity {
    return new FolderEntity(
      FolderId.create(id),
      FolderTitle.create(title),
      TesterId.create(testerId),
      RepositoryId.create(repositoryId),
      FolderDescription.create(description),
      FolderPath.create(path),
    );
  }
}
