import { AddProjectCommand } from './add-project.command';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerEntity } from '../../domain/customer/customer.entity';
import { CustomerAlreadyExistsError } from './customer-already-exists.error';
import { Email } from 'src/core/domain/email';
import { ConfigModule } from '@nestjs/config';
void ConfigModule.forRoot(); // Cargar .env

@Injectable()
export class RegisterCustomerCommandHandler {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly repository: ProjectRepository,
  ) {}

  async handle(command: AddProjectCommand) {
    const email = Email.create(command.email);

    if (! await this.repository.findByEmail(email)) {
      throw CustomerAlreadyExistsError.withEmail(command.email);
    }

    if (await this.repository.findByUserId(command.userId)) {
      throw CustomerAlreadyExistsError.withUserId(command.userId);
    }


    const customer = CustomerEntity.create(
      command.id,
      command.name,
      command.surname,
      command.email,
      command.companyName,
      command.taxDomicile,
      command.NIF,
      command.userId,
      hashedPassword,
    );

    await this.repository.save(customer);
  }
}
