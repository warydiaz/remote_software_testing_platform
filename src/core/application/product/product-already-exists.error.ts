export class ProductAlreadyExistsError extends Error {
  private constructor(message: string) {
    super(message);
    this.name = 'ProductAlreadyExistsError';
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
