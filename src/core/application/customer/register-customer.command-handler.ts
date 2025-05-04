import { RegisterCustomerCommand } from './register-customer.command';
import { Inject, Injectable } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  CustomerRepository,
} from '../../domain/customer/customer.repository';
import { CustomerEntity } from '../../domain/customer/customer.entity';
import { CustomerAlreadyExistsError } from './customer-already-exists.error';
import { NIF } from '../../domain/customer/nif';
import { Email } from 'src/core/domain/email';
import * as bcrypt from 'bcrypt';
import { ConfigModule } from '@nestjs/config';
void ConfigModule.forRoot(); // Cargar .env

@Injectable()
export class RegisterCustomerCommandHandler {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly repository: CustomerRepository,
  ) {}

  saltRounds: number = parseInt(process.env.SALT_ROUNDS ?? '10');

  async handle(command: RegisterCustomerCommand) {

    console.log('command', command);
    const nif = NIF.create(command.NIF);
    const email = Email.create(command.email);

    console.log('Hay nif', await this.repository.findByNIF(nif));

    if (await this.repository.findByNIF(nif)) {
      throw CustomerAlreadyExistsError.withNif(command.NIF);
    }

    if (await this.repository.findByEmail(email)) {
      throw CustomerAlreadyExistsError.withEmail(command.email);
    }

    if (await this.repository.findByUserId(command.userId)) {
      throw CustomerAlreadyExistsError.withUserId(command.userId);
    }

    const hashedPassword = await bcrypt.hash(command.password, this.saltRounds);

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

    console.log('customer', customer);

    await this.repository.save(customer);
  }
}
