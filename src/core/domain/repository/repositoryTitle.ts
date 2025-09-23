import { RepositoryError } from './repository.error';

export class RepositoryTitle {
  private constructor(public readonly value: string) {}

  static create(title: string): RepositoryTitle {
    if (!title || title.trim().length === 0) {
      throw RepositoryError.withInvalidTitle();
    }
    return new RepositoryTitle(title.trim());
  }
}
