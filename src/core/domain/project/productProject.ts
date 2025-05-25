import { ProjectError } from './project.error';

export class ProductProject {
  private constructor(private readonly value: string) {}

  static create(product: string): ProductProject {
    if (!product || product.trim().length === 0) {
      throw ProjectError.withInvalidName();
    }
    return new ProductProject(product.trim());
  }
}
