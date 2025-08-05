import { BaseError } from '../../../error';

export class CustomerNotExistsError extends BaseError {
  private constructor(message: string) {
    super('customer-not-exists', message);
  }

  static withEmail(email: string) {
    return new CustomerNotExistsError(
      `Customer with email ${email} not exists`,
    );
  }
}
