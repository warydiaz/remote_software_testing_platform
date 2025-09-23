import { FolderError } from './folder.error';

export class FolderTitle {
  private constructor(public readonly value: string) {}

  static create(title: string): FolderTitle {
    if (!title || title.trim().length === 0) {
      throw FolderError.withInvalidTitle();
    }
    return new FolderTitle(title.trim());
  }
}
