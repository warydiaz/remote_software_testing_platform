import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerPersistenceEntity } from './entities/customer.persistence.entity';
import { CustomerRepository } from '../../domain/customer/customer.repository';
import { CustomerEntity } from '../../domain/customer/customer.entity';
import { CustomerId } from '../../domain/customer/id';
import { NIF } from '../../domain/customer/nif';

@Injectable()
export class CustomerTypeOrmRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerPersistenceEntity)
    private readonly repository: Repository<CustomerPersistenceEntity>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async save(customer: CustomerEntity): Promise<void> {
    const dbCustomer = new CustomerPersistenceEntity();
    dbCustomer.id = customer.id.value;
    dbCustomer.name = customer.name.value;
    dbCustomer.surname = customer.surname.value;
    dbCustomer.email = customer.email.value;
    dbCustomer.companyName = customer.companyName.value;
    dbCustomer.taxDomicile = customer.taxDomicile.value;
    dbCustomer.NIF = customer.NIF.value;

    await this.repository.save(dbCustomer);
  }

  async findById(id: CustomerId): Promise<CustomerEntity | undefined> {
    const dbCustomer = await this.repository.findOne({
      where: { id: id.value },
    });
    return dbCustomer ? this.toDomain(dbCustomer) : undefined;
  }

  async findByNIF(nif: NIF): Promise<CustomerEntity | undefined> {
    const dbCustomer = await this.repository.findOne({
      where: { NIF: nif.value },
    });
    return dbCustomer ? this.toDomain(dbCustomer) : undefined;
  }

  private toDomain(dbCustomer: CustomerPersistenceEntity): CustomerEntity {
    return CustomerEntity.create(
      dbCustomer.id,
      dbCustomer.name,
      dbCustomer.surname,
      dbCustomer.email,
      dbCustomer.companyName,
      dbCustomer.taxDomicile,
      dbCustomer.NIF,
    );
  }
}
