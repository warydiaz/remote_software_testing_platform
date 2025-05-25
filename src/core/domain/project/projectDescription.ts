import { ProjectError } from './project.error';

export class ProjectDescription {
  private constructor(private readonly value: string) {}

  static create(description: string): ProjectDescription {
    if (!description || description.trim().length === 0) {
      throw ProjectError.withInvalidDescription();
    }
    return new ProjectDescription(description.trim());
  }
}
