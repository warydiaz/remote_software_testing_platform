import { RegisterCustomerCommand } from './register-customer.command';
import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  CustomerRepository,
} from '../../domain/customer/customer.repository';
import { CustomerEntity } from '../../domain/customer/customer.entity';
import { CustomerAlreadyExistsError } from './customer-already-exists.error';
import { NIF } from '../../domain/customer//nif';

@Injectable()
export class RegisterCustomerCommandHandler {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly repository: CustomerRepository,
  ) {}

  async handle(command: RegisterCustomerCommand) {
    const nif = NIF.create(command.NIF);

    if (await this.repository.findByNIF(nif)) {
      throw CustomerAlreadyExistsError.withNif(command.NIF);
    }

    const customer = CustomerEntity.create(
      command.id,
      command.name,
      command.surname,
      command.email,
      command.companyName,
      command.taxDomicile,
      command.NIF,
    );

    this.repository.save(customer);
  }
}
