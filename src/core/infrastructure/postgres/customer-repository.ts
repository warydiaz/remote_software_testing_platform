/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerPersistenceEntity } from './entities/customer.persistence.entity';
import { CustomerRepository } from '../../domain/customer/customer.repository';
import { CustomerEntity } from '../../domain/customer/customer.entity';
import { CustomerId } from '../../domain/customer/id';
import { NIF } from '../../domain/customer/nif';
import { Email } from 'src/core/domain/email';
import { UserPersistenceEntity } from './entities/user.persistence.entity';

@Injectable()
export class CustomerTypeOrmRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerPersistenceEntity)
    private readonly customerRepository: Repository<CustomerPersistenceEntity>,
    @InjectRepository(UserPersistenceEntity)
    private readonly userRepository: Repository<UserPersistenceEntity>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async save(customer: CustomerEntity): Promise<void> {
    const user = new UserPersistenceEntity();
    user.id = customer.id.value;
    user.userId = customer.userId;
    user.email = customer.email.value;
    user.name = customer.name.value;
    user.surname = customer.surname.value;
    user.password = customer.password;

    await this.userRepository.save(user);

    const dbCustomer = new CustomerPersistenceEntity();
    dbCustomer.id = customer.id.value;
    dbCustomer.companyName = customer.companyName.value;
    dbCustomer.taxDomicile = customer.taxDomicile.value;
    dbCustomer.nif = customer.NIF.value;

    await this.customerRepository.save(dbCustomer);
  }

  async findById(id: CustomerId): Promise<CustomerEntity | undefined> {
    const dbCustomer = await this.customerRepository.findOne({
      where: { id: id.value },
    });

    const dbUser = await this.userRepository.findOne({
      where: { id: id.value },
    });

    if (!dbCustomer || !dbUser) {
      return undefined;
    }

    return dbCustomer ? this.toCustomerDomain(dbCustomer, dbUser) : undefined;
  }

  async findByNIF(nif: NIF): Promise<CustomerEntity | undefined> {
    const dbCustomer = await this.customerRepository.findOne({
      where: { nif: nif.value },
    });

    if (!dbCustomer) {
      return undefined;
    }

    const dbUser = await this.userRepository.findOne({
      where: { id: dbCustomer.id },
    });

    if (!dbUser) {
      return undefined;
    }
    return this.toCustomerDomain(dbCustomer, dbUser);
  }

  async findByEmail(email: Email): Promise<CustomerEntity | undefined> {
    const dbUser = await this.userRepository.findOne({
      where: { id: email.value },
    });

    if (!dbUser) {
      return undefined;
    }

    const dbCustomer = await this.customerRepository.findOne({
      where: { id: dbUser.id },
    });

    if (!dbCustomer) {
      return undefined;
    }

    return this.toCustomerDomain(dbCustomer, dbUser);
  }

  async findByUserId(userid: string): Promise<CustomerEntity | undefined> {
    const dbUser = await this.userRepository.findOne({
      where: { userId: userid },
    });

    if (!dbUser) {
      return undefined;
    }

    const dbCustomer = await this.customerRepository.findOne({
      where: { id: dbUser.id },
    });

    if (!dbCustomer) {
      return undefined;
    }

    return this.toCustomerDomain(dbCustomer, dbUser);
  }

  private toCustomerDomain(
    dbCustomer: CustomerPersistenceEntity,
    dbUser: UserPersistenceEntity,
  ): CustomerEntity {
    return CustomerEntity.create(
      dbUser.id,
      dbUser.name,
      dbUser.surname,
      dbUser.email,
      dbCustomer.companyName,
      dbCustomer.taxDomicile,
      dbCustomer.nif,
      dbUser.userId,
      dbUser.password,
    );
  }
}
