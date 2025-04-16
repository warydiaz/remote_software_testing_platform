import { BaseError } from '../../../error';

export class ProfessionalProfileDoNotExistsError extends BaseError {
  private constructor(message: string) {
    super('professional-profile-do-not-exists', message);
  }

  static interestWithId(id: number[]) {
    return new ProfessionalProfileDoNotExistsError(
      `Interest with Id(s) ${id.join(', ')} do not exist`,
    );
  }

  static experienceLevelWithId(id: number) {
    return new ProfessionalProfileDoNotExistsError(
      `Experience Level with Id ${id} do not exist`,
    );
  }
}
