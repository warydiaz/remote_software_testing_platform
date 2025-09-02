import { FolderError } from './folder.error';

export class FolderDescription {
  private constructor(public readonly value: string) {}

  static create(description: string): FolderDescription {
    if (!description || description.trim().length === 0) {
      throw FolderError.withInvalidDescription();
    }
    return new FolderDescription(description.trim());
  }
}
