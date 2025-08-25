import { Inject, Injectable } from '@nestjs/common';
import { AddProductCommand } from './add-product.command';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../../domain/product/product.repository';
import {
  PROJECT_REPOSITORY,
  ProjectRepository,
} from '../../domain/project/project.repository';
import { ProductEntity } from '../../domain/product/product.entity';
import { ProjectNotFoundError } from './project-not-found.error';
import { ProductAlreadyExistsError } from './product-already-exists.error';
import { ProjectId } from '../../domain/project/id';
import { InvalidProductDatesError } from './invalid-product-dates.error';

@Injectable()
export class AddProductCommandHandler {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async handle(command: AddProductCommand): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const projectId = new ProjectId(command.projectId);

    const existingProduct = await this.productRepository.findByProjectIdAndName(
      projectId,
      command.name,
    );

    if (existingProduct) {
      throw ProductAlreadyExistsError.withName(command.id);
    }

    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw ProjectNotFoundError.withId(command.projectId);
    }

    const startDate = new Date(command.cycleStartDate);
    const endDate = new Date(command.cycleEndDate);

    if (endDate < startDate) {
      throw InvalidProductDatesError.endDateBeforeStartDate(startDate, endDate);
    }

    const product = ProductEntity.create(
      command.id,
      command.projectId,
      command.name,
      command.description,
      startDate,
      endDate,
      command.environment,
    );

    await this.productRepository.save(product);
  }
}
