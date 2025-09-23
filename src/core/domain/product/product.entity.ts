import { ProductId } from './id';
import { ProjectId } from './../project/id';
import { ProductName } from './/productName';
import { ProductDescription } from './productDescription';
import { ProjectDate } from './../project/projectDate';
import { ProductEnvironment } from './productEnvironment';

export class ProductEntity {
  constructor(
    public readonly id: ProductId,
    public readonly projectId: ProjectId,
    public readonly name: ProductName,
    public readonly description: ProductDescription,
    public readonly cycleStartDate: ProjectDate,
    public readonly cycleEndDate: ProjectDate,
    public readonly environment: ProductEnvironment,
  ) {}

  static create(
    rawProductId: string,
    rawProjectId: string,
    rawName: string,
    rawDescription: string,
    rawStartDate: Date,
    rawEndDate: Date,
    rawEnvironment: string,
  ): ProductEntity {
    const productId = ProductId.create(rawProductId);
    const projectId = ProjectId.create(rawProjectId);
    const name = ProductName.create(rawName);
    const description = ProductDescription.create(rawDescription);
    const cycleStartDate = ProjectDate.create(rawStartDate);
    const cycleEndDate = ProjectDate.create(rawEndDate);
    const environment = ProductEnvironment.create(rawEnvironment);

    return new ProductEntity(
      productId,
      projectId,
      name,
      description,
      cycleStartDate,
      cycleEndDate,
      environment,
    );
  }
}
