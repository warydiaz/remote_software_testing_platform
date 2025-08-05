import { BaseError } from '../../../error';

export class UnauthorizedExceptionError extends BaseError {
  constructor() {
    super('unauthorized', 'User not found or inactive');
  }
}
