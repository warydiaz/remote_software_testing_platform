import { BaseError } from '../../../error';

export class FileValuesError extends BaseError {
  private constructor(message: string) {
    super('file-error', message);
  }

  static withFolderId(folderId: string) {
    return new FileValuesError(`Folder with id ${folderId} does not exist`);
  }

  static withTestId(testId: string) {
    return new FileValuesError(`Test with id ${testId} does not exist`);
  }

  static withFolderIdEmpty() {
    return new FileValuesError(`Folder id is empty`);
  }

  static withTestIdEmpty() {
    return new FileValuesError(`Test id is empty`);
  }

  static withFolderWithTestId(testId: string, folderId: string) {
    return new FileValuesError(
      `File with test ${testId} already exists in folder ${folderId}`,
    );
  }
}
