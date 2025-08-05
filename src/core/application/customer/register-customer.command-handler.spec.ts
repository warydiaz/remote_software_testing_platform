/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import * as bcrypt from 'bcrypt';
import { RegisterCustomerCommandHandler } from './register-customer.command-handler';
import { CustomerRepository } from '../../domain/customer/customer.repository';
import { RegisterCustomerCommand } from './register-customer.command';
import { CustomerEntity } from '../../domain/customer/customer.entity';
import { CustomerAlreadyExistsError } from './customer-already-exists.error';
import { v4 as uuid } from 'uuid';

// Mock bcrypt.hash
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('RegisterCustomerCommandHandler', () => {
  let handler: RegisterCustomerCommandHandler;
  let repository: jest.Mocked<CustomerRepository>;

  const command: RegisterCustomerCommand = {
    id: uuid(), // Genera un UUID válido
    name: 'John',
    surname: 'Doe',
    email: 'john@example.com',
    companyName: 'MyCompany',
    taxDomicile: 'Somewhere',
    NIF: '12345678X',
    userId: 'user-123',
    password: 'plain-password',
  };

  beforeEach(() => {
    repository = {
      findByNIF: jest.fn(),
      findByEmail: jest.fn(),
      findByUserId: jest.fn(),
      save: jest.fn(),
    } as any;

    handler = new RegisterCustomerCommandHandler(repository);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
  });

  it('should throw if customer already exists by NIF', async () => {
    repository.findByNIF.mockResolvedValue({} as CustomerEntity);

    await expect(handler.handle(command)).rejects.toThrow(
      CustomerAlreadyExistsError.withNif(command.NIF),
    );
    expect(repository.findByNIF).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should throw if customer already exists by email', async () => {
    repository.findByNIF.mockResolvedValue(undefined);
    repository.findByEmail.mockResolvedValue({} as CustomerEntity);

    await expect(handler.handle(command)).rejects.toThrow(
      CustomerAlreadyExistsError.withEmail(command.email),
    );
  });

  it('should throw if customer already exists by userId', async () => {
    repository.findByNIF.mockResolvedValue(undefined);
    repository.findByEmail.mockResolvedValue(undefined);
    repository.findByUserId.mockResolvedValue({} as CustomerEntity);

    await expect(handler.handle(command)).rejects.toThrow(
      CustomerAlreadyExistsError.withUserId(command.userId),
    );
  });

  it('should save a new customer when not existing', async () => {
    repository.findByNIF.mockResolvedValue(undefined);
    repository.findByEmail.mockResolvedValue(undefined);
    repository.findByUserId.mockResolvedValue(undefined);

    await handler.handle(command);

    expect(bcrypt.hash).toHaveBeenCalledWith(
      command.password,
      handler.saltRounds,
    );
    expect(repository.save).toHaveBeenCalledWith(expect.any(CustomerEntity));
  });
});
