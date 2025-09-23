import { BaseError } from '../../../error';

export class RepositoryAlreadyExistsError extends BaseError {
  private constructor(message: string) {
    super('repository-already-exists', message);
  }

  static withTitle(title: string) {
    return new RepositoryAlreadyExistsError(
      `Repository with title ${title} already exists`,
    );
  }
}
