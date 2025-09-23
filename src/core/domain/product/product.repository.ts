import { ProjectId } from '../project/id';
import { ProductEntity } from './product.entity';

export interface ProductRepository {
  save(product: ProductEntity): Promise<void>;
  findByProjectIdAndName(
    projectId: ProjectId,
    name: string,
  ): Promise<ProductEntity | null>;

  findByName(name: string): Promise<ProductEntity | null>;

  exists(productId: string, projectId: string): Promise<boolean>;
}

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';
