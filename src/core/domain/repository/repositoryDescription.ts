import { RepositoryError } from './repository.error';

export class RepositoryDescription {
  private constructor(public readonly value: string) {}

  static create(description: string): RepositoryDescription {
    if (!description || description.trim().length === 0) {
      throw RepositoryError.withInvalidDescription();
    }
    return new RepositoryDescription(description.trim());
  }
}
