/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { AddProjectCommand } from './add-project.command';
import { ProjectRepository } from '../../domain/project/project.repository';
import { CustomerRepository } from '../../domain/customer/customer.repository';
import { ProjectAlreadyExistsError } from './project-already-exists.error';
import { InvalidProjectDatesError } from './Invalid-project-dates.error';
import { v4 as uuid } from 'uuid';
import { AddProjectCommandHandler } from './add-project.command-handler';

describe('AddProjectCommandHandler', () => {
  let handler: AddProjectCommandHandler;
  let projectRepository: jest.Mocked<ProjectRepository>;
  let customerRepository: jest.Mocked<CustomerRepository>;

  const baseCommand: AddProjectCommand = {
    id: uuid(),
    name: 'Project Name',
    description: 'Description',
    email: 'test@example.com',
    product: 'Product X',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
    testType: [1, 2],
  };

  beforeEach(() => {
    projectRepository = {
      findByName: jest.fn(),
      save: jest.fn(),
    } as any;

    customerRepository = {
      findByEmail: jest.fn(),
    } as any;

    handler = new AddProjectCommandHandler(
      projectRepository,
      customerRepository,
    );
  });

  it('should throw if project with same name exists', async () => {
    projectRepository.findByName.mockResolvedValue({} as any);

    await expect(handler.handle(baseCommand)).rejects.toBeInstanceOf(
      ProjectAlreadyExistsError,
    );
  });

  it('should throw if endDate is before startDate', async () => {
    const badCommand: AddProjectCommand = {
      ...baseCommand,
      startDate: new Date('2025-02-01'),
      endDate: new Date('2025-01-01'),
    };

    await expect(handler.handle(badCommand)).rejects.toBeInstanceOf(
      InvalidProjectDatesError,
    );
  });

  it('should save project when all validations pass', async () => {
    await handler.handle(baseCommand);

    expect(projectRepository.save).toHaveBeenCalled();
  });
});
