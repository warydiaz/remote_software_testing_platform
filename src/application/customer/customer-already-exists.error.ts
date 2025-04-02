import { BaseError } from '../../error';

export class CustomerAlreadyExistsError extends BaseError {
  private constructor(message: string) {
    super('customer-already-exists', message);
  }

  static withNif(nif: string) {
    return new CustomerAlreadyExistsError(
      `Customer with NIF ${nif} already exists`,
    );
  }
}
