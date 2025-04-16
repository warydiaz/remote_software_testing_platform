import { CustomerEntity } from './customer.entity';
import { Email } from '../email';
import { CustomerId } from './id';
import { NIF } from './nif';

export interface CustomerRepository {
  save(user: CustomerEntity): void;
  findById(id: CustomerId): Promise<CustomerEntity | undefined>;
  findByNIF(nif: NIF): Promise<CustomerEntity | undefined>;
  findByEmail(email: Email): Promise<CustomerEntity | undefined>;
}

export const CUSTOMER_REPOSITORY = Symbol('CustomerRepository');
