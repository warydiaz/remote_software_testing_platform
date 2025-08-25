export class ProjectNotFoundError extends Error {
  private constructor(message: string) {
    super(message);
    this.name = 'ProjectNotFoundError';
  }

  static withId(id: string): ProjectNotFoundError {
    return new ProjectNotFoundError(`Project with ID '${id}' was not found.`);
  }
}
