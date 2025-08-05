import { BaseError } from '../../../error';

export class TooManyRequestsError extends BaseError {
  constructor() {
    super(
      'too-many-requests',
      'You have sent too many requests. Please try again later.',
    );
  }
}
