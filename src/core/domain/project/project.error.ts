import { BaseError } from '../../../error';

export class ProjectError extends BaseError {
  private constructor(message: string) {
    super('project-error', message);
  }

  static withInvalidEmail(name: string): ProjectError {
    return new ProjectError(`Invalid email value: ${name}`);
  }

  static withInvalidName(): ProjectError {
    return new ProjectError(`Project name cannot be empty`);
  }
  static withInvalidDescription(): ProjectError {
    return new ProjectError(`Project description cannot be empty`);
  }

  static withInvalidDate(): ProjectError {
    return new ProjectError(`Invalid date`);
  }

  static withInvalidTestType(): ProjectError {
    return new ProjectError(`TestType must be a positive integer.`);
  }
}
