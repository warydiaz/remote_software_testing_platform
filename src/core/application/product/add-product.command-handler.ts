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
import { EnvironmentNotFoundError } from './invalid-environment-value.error';

@Injectable()
export class AddProductCommandHandler {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async handle(command: AddProductCommand): Promise<void> {
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

    if (command.cycleEndDate < command.cycleStartDate) {
      throw InvalidProductDatesError.endDateBeforeStartDate(
        command.cycleStartDate,
        command.cycleEndDate,
      );
    }

    if (
      command.cycleStartDate < project.startDate.value ||
      command.cycleEndDate > project.endDate.value
    ) {
      throw InvalidProductDatesError.outsideProjectDates(
        project.startDate.value,
        project.endDate.value,
        command.cycleStartDate,
        command.cycleEndDate,
      );
    }

    if (!command.environment) {
      throw EnvironmentNotFoundError.emptyValue();
    }

    const product = ProductEntity.create(
      command.id,
      command.projectId,
      command.name,
      command.description,
      command.cycleStartDate,
      command.cycleEndDate,
      command.environment,
    );

    await this.productRepository.save(product);
  }
}
