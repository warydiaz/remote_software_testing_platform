import { BaseError } from '../../../error';

export class ProjectAlreadyExistsError extends BaseError {
  private constructor(message: string) {
    super('project-already-exists', message);
  }

  static withEmail(email: string) {
    return new ProjectAlreadyExistsError(
      `Project with email ${email} already exists`,
    );
  }

  static withName(name: string) {
    return new ProjectAlreadyExistsError(
      `Project with name ${name} already exists`,
    );
  }

  static withId(id: string) {
    return new ProjectAlreadyExistsError(
      `Project with id ${id} already exists`,
    );
  }
}
