import { CustomerEntity } from './customer.entity';
import { CustomerId } from './id';
import { NIF } from './nif';

export interface CustomerRepository {
  save(user: CustomerEntity): void;
  findById(id: CustomerId): CustomerEntity | undefined;
  findByNIF(nif: NIF): CustomerEntity | undefined;
}

export const CUSTOMER_REPOSITORY = Symbol('CustomerRepository');
