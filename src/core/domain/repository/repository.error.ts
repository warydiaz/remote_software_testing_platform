import { BaseError } from '../../../error';

export class RepositoryError extends BaseError {
  private constructor(message: string) {
    super('repository-error', message);
  }

  static withInvalidTitle(): RepositoryError {
    return new RepositoryError(`Repository title cannot be empty`);
  }
  static withInvalidDescription(): RepositoryError {
    return new RepositoryError(`Repository description cannot be empty`);
  }
}
