import { RepositoryId } from '../repository/id';
import { FolderDescription } from './folderDescription';
import { FolderPath } from './folderPath';
import { FolderTitle } from './folderTitle';
import { FolderId } from './id';

export class FolderEntity {
  private constructor(
    public readonly id: FolderId,
    public readonly repositoryId: RepositoryId,
    public readonly title: FolderTitle,
    public readonly description: FolderDescription,
    public readonly path: FolderPath,
  ) {}

  static create(
    id: string,
    repositoryId: string,
    title: string,
    description: string,
    path: string,
  ): FolderEntity {
    return new FolderEntity(
      FolderId.create(id),
      RepositoryId.create(repositoryId),
      FolderTitle.create(title),
      FolderDescription.create(description),
      FolderPath.create(path),
    );
  }
}
