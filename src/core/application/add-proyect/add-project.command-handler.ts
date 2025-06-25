import { AddProjectCommand } from './add-project.command';
import { Inject, Injectable } from '@nestjs/common';
import { Email } from 'src/core/domain/email';
import { ConfigModule } from '@nestjs/config';
import {
  CUSTOMER_REPOSITORY,
  CustomerRepository,
} from 'src/core/domain/customer/customer.repository';
import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from 'src/core/domain/project/project.repository';
import { CustomerNotExistsError } from './customer-not-exists.error';
import { ProjectEntity } from 'src/core/domain/project/project.entity';
void ConfigModule.forRoot(); // Cargar .env

@Injectable()
export class RegisterCustomerCommandHandler {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async handle(command: AddProjectCommand) {
    const email = Email.create(command.email);

    if (await this.customerRepository.findByEmail(email)) {
      throw CustomerNotExistsError.withEmail(command.email);
    }

    const project = ProjectEntity.create(
      command.id,
      command.name,
      command.description,
      command.email,
      command.product,
      command.startDate,
      command.endDate,
      command.testType,
    );

    await this.projectRepository.save(project);
  }
}
