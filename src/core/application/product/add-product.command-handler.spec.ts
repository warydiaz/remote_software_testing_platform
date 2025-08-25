/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { AddProductCommandHandler } from './add-product.command-handler';
import { AddProductCommand } from './add-product.command';
import { ProductRepository } from '../../domain/product/product.repository';
import { ProjectRepository } from '../../domain/project/project.repository';
import { ProductAlreadyExistsError } from './product-already-exists.error';
import { ProjectNotFoundError } from './project-not-found.error';
import { InvalidProductDatesError } from './invalid-product-dates.error';
import { ProductEntity } from '../../domain/product/product.entity';
import { v4 as uuid } from 'uuid';

describe('AddProductCommandHandler', () => {
  let handler: AddProductCommandHandler;
  let productRepository: jest.Mocked<ProductRepository>;
  let projectRepository: jest.Mocked<ProjectRepository>;

  const baseCommand: AddProductCommand = {
    id: uuid(),
    projectId: uuid(),
    name: 'Product Name',
    description: 'Product description',
    cycleStartDate: new Date('2025-01-01'),
    cycleEndDate: new Date('2025-01-31'),
    environment: 'dev',
  };

  beforeEach(() => {
    productRepository = {
      findByProjectIdAndName: jest.fn(),
      save: jest.fn(),
    } as any;

    projectRepository = {
      findById: jest.fn(),
    } as any;

    handler = new AddProductCommandHandler(
      productRepository,
      projectRepository,
    );
  });

  it('should throw if product with same name already exists', async () => {
    productRepository.findByProjectIdAndName.mockResolvedValue(
      {} as ProductEntity,
    );

    await expect(handler.handle(baseCommand)).rejects.toBeInstanceOf(
      ProductAlreadyExistsError,
    );
  });

  it('should throw if project does not exist', async () => {
    productRepository.findByProjectIdAndName.mockResolvedValue(null);
    projectRepository.findById.mockResolvedValue(undefined);

    await expect(handler.handle(baseCommand)).rejects.toBeInstanceOf(
      ProjectNotFoundError,
    );
  });

  it('should throw if endDate is before startDate', async () => {
    productRepository.findByProjectIdAndName.mockResolvedValue(null);
    projectRepository.findById.mockResolvedValue({
      id: baseCommand.projectId,
    } as any);

    const badCommand: AddProductCommand = {
      ...baseCommand,
      cycleStartDate: new Date('2025-02-01'),
      cycleEndDate: new Date('2025-01-01'),
    };

    await expect(handler.handle(badCommand)).rejects.toBeInstanceOf(
      InvalidProductDatesError,
    );
  });

  it('should save product when all validations pass', async () => {
    productRepository.findByProjectIdAndName.mockResolvedValue(null);
    projectRepository.findById.mockResolvedValue({
      id: baseCommand.projectId,
    } as any);

    await handler.handle(baseCommand);

    expect(productRepository.save).toHaveBeenCalled();
    const savedProduct = productRepository.save.mock.calls[0][0];
    expect(savedProduct).toBeInstanceOf(ProductEntity);
    expect(savedProduct.name.value).toBe(baseCommand.name);
  });
});
