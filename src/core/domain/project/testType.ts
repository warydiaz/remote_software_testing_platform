import { ProjectError } from './project.error';

export class TestType {
  private constructor(private readonly value: number) {
    if (value <= 0) {
      throw ProjectError.withInvalidTestType();
    }
  }

  static create(value: number): TestType {
    return new TestType(value);
  }
}
