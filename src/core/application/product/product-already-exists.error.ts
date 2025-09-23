import { BaseError } from '../../../error';
export class ProductAlreadyExistsError extends BaseError {
  private constructor(message: string) {
    super('invalid-Product', message);
  }

  static withIdAndProject(
    productId: string,
    projectId: string,
  ): ProductAlreadyExistsError {
    return new ProductAlreadyExistsError(
      `Product with ID '${productId}' already exists for project '${projectId}'.`,
    );
  }

  static withName(name: string): ProductAlreadyExistsError {
    return new ProductAlreadyExistsError(
      `Product with name '${name}' already exists.`,
    );
  }
}
