import { BaseError } from '../../../error';

export class FolderError extends BaseError {
  private constructor(message: string) {
    super('folder-error', message);
  }

  static withInvalidTitle(): FolderError {
    return new FolderError(`Folder title cannot be empty`);
  }
  static withInvalidDescription(): FolderError {
    return new FolderError(`Folder description cannot be empty`);
  }

  static withInvalidPath(): FolderError {
    return new FolderError(`Folder path cannot be empty`);
  }
}
