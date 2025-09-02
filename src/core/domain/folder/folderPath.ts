import { FolderError } from './folder.error';

export class FolderPath {
  private constructor(public readonly value: string) {}

  static create(path: string): FolderPath {
    if (!path || path.trim().length === 0) {
      throw FolderError.withInvalidPath();
    }
    return new FolderPath(path.trim());
  }
}
