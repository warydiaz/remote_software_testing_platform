/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRepository } from '../../domain/product/product.repository';
import { ProductEntity } from '../../domain/product/product.entity';
import { ProductPersistenceEntity } from './entities/product.persistence.entity';
import { ProjectId } from '../../domain/project/id';

@Injectable()
export class ProductTypeOrmRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductPersistenceEntity)
    private readonly productRepo: Repository<ProductPersistenceEntity>,
  ) {}

  async save(product: ProductEntity): Promise<void> {
    const dbProduct = new ProductPersistenceEntity();

    dbProduct.id = product.id.value;
    dbProduct.projectId = product.projectId.value;
    dbProduct.name = product.name.value;
    dbProduct.description = product.description.value;
    dbProduct.cycleStartDate = product.cycleStartDate.value;
    dbProduct.cycleEndDate = product.cycleEndDate.value;
    dbProduct.environment = product.environment.value;

    await this.productRepo.save(dbProduct);
  }

  async findByProjectIdAndName(
    projectId: ProjectId,
    name: string,
  ): Promise<ProductEntity | null> {
    const dbProduct = await this.productRepo.findOne({
      where: { projectId: projectId.value, name },
    });

    return dbProduct ? this.toDomain(dbProduct) : null;
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    const dbProduct = await this.productRepo.findOne({
      where: { name },
    });

    return dbProduct ? this.toDomain(dbProduct) : null;
  }

  async exists(productId: string, projectId: string): Promise<boolean> {
    const count = await this.productRepo.count({
      where: { id: productId, projectId },
    });
    return count > 0;
  }

  private toDomain(db: ProductPersistenceEntity): ProductEntity {
    return ProductEntity.create(
      db.id,
      db.projectId,
      db.name,
      db.description,
      db.cycleStartDate,
      db.cycleEndDate,
      db.environment,
    );
  }
}
