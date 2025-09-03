import { BaseError } from '../../../error';

export class FolderEmptyValuesError extends BaseError {
  private constructor(message: string) {
    super('folder-error', message);
  }

  static withTitle(title: string) {
    return new FolderEmptyValuesError(
      `Folder with title ${title} already exists`,
    );
  }
  static withRepositoryId(repositoryId: string) {
    return new FolderEmptyValuesError(
      `Repository with id ${repositoryId} does not exist`,
    );
  }

  static withEmptyPath() {
    return new FolderEmptyValuesError(`Folder with empty path`);
  }

  static withEmptyDescription() {
    return new FolderEmptyValuesError(`Folder with empty description`);
  }
}
