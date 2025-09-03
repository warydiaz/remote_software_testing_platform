import { BaseError } from '../../../error';

export class FolderAlreadyExistsError extends BaseError {
  private constructor(message: string) {
    super('folder-already-exists', message);
  }

  static withTitle(title: string) {
    return new FolderAlreadyExistsError(
      `Folder with title ${title} already exists`,
    );
  }
  static withRepositoryId(repositoryId: string) {
    return new FolderAlreadyExistsError(
      `Repository with id ${repositoryId} does not exist`,
    );
  }

  static withEmptyPath() {
    return new FolderAlreadyExistsError(`Folder with empty path`);
  }

  static withEmptyDescription() {
    return new FolderAlreadyExistsError(`Folder with empty description`);
  }
}
