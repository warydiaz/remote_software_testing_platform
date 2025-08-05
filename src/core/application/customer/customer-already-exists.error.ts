import { BaseError } from '../../../error';

export class CustomerAlreadyExistsError extends BaseError {
  private constructor(message: string) {
    super('customer-already-exists', message);
  }

  static withNif(nif: string) {
    return new CustomerAlreadyExistsError(
      `Customer with NIF ${nif} already exists`,
    );
  }
  static withEmail(email: string) {
    return new CustomerAlreadyExistsError(
      `Customer with email ${email} already exists`,
    );
  }

  static withUserId(userId: string) {
    return new CustomerAlreadyExistsError(
      `Customer with userId ${userId} already exists`,
    );
  }
}
