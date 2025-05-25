// src/core/domain/project/projectDate.ts

import { ProjectError } from './project.error';

export class ProjectDate {
  private constructor(private readonly value: Date) {}

  static create(date: Date): ProjectDate {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw ProjectError.withInvalidDate();
    }

    return new ProjectDate(date);
  }
}
