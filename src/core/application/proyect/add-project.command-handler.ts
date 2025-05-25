import { Inject, Injectable } from '@nestjs/common';
import { AddProjectCommand } from './add-project.command';
import { PROJECT_REPOSITORY } from '../../domain/project/project.repository';
import { ProjectRepository } from '../../domain/project/project.repository';
import { ProjectEntity } from '../../domain/project/project.entity';
import { ProjectAlreadyExistsError } from './project-already-exists.error';
import { InvalidProjectDatesError } from './Invalid-project-dates.error';

@Injectable()
export class AddProjectCommandHandler {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly repository: ProjectRepository,
  ) {}

  async handle(command: AddProjectCommand): Promise<void> {
    const existingByName = await this.repository.findByName(command.name);
    if (existingByName) {
      throw ProjectAlreadyExistsError.withName(command.name);
    }

    const startDate = new Date(command.startDate);
    const endDate = new Date(command.endDate);

    if (endDate < startDate) {
      throw InvalidProjectDatesError.endDateBeforeStartDate(startDate, endDate);
    }

    const project = ProjectEntity.create(
      command.id,
      command.name,
      command.description,
      command.email,
      command.product,
      startDate,
      endDate,
      command.testType,
    );

    await this.repository.save(project);
  }
}
