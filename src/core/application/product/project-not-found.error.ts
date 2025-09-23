import { BaseError } from '../../../error';
export class ProjectNotFoundError extends BaseError {
  private constructor(message: string) {
    super('invalid-Project', message);
  }

  static withId(id: string): ProjectNotFoundError {
    return new ProjectNotFoundError(`Project with ID '${id}' was not found.`);
  }
}
