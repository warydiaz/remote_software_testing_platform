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
}
