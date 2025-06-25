import { Inject, Injectable } from '@nestjs/common';
import { AddProjectCommand } from './add-project.command';
import { PROJECT_REPOSITORY } from '../../domain/project/project.repository';
import { ProjectRepository } from '../../domain/project/project.repository';
import { ProjectEntity } from '../../domain/project/project.entity';
import { ProjectAlreadyExistsError } from './project-already-exists.error';
import { InvalidProjectDatesError } from './Invalid-project-dates.error';
import {
  CUSTOMER_REPOSITORY,
  CustomerRepository,
} from 'src/core/domain/customer/customer.repository';
import { CustomerNotExistsError } from './customer-not-exists.error';
import { Email } from 'src/core/domain/email';

@Injectable()
export class AddProjectCommandHandler {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly repository: ProjectRepository,
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async handle(command: AddProjectCommand): Promise<void> {
    const existingByName = await this.repository.findByName(command.name);
    if (existingByName) {
      throw ProjectAlreadyExistsError.withName(command.name);
    }

    const email = Email.create(command.email);
    if (await this.customerRepository.findByEmail(email)) {
      throw CustomerNotExistsError.withEmail(command.email);
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
