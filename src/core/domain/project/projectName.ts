import { ProjectError } from './project.error';

export class ProjectName {
  private constructor(public readonly value: string) {}

  static create(name: string): ProjectName {
    if (!name || name.trim().length === 0) {
      throw ProjectError.withInvalidName();
    }
    return new ProjectName(name.trim());
  }
}
