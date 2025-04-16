import { BaseError } from '../../../error';

export class TesterAlreadyExistsError extends BaseError {
  private constructor(message: string) {
    super('tester-already-exists', message);
  }

  static withEmail(email: string) {
    return new TesterAlreadyExistsError(
      `Tester with email ${email} already exists`,
    );
  }
}
