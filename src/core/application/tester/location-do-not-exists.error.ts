import { BaseError } from '../../../error';

export class LocationDoNotExistsError extends BaseError {
  private constructor(message: string) {
    super('location-do-not-exists', message);
  }

  static languageWithId(id: number) {
    return new LocationDoNotExistsError(`Language with Id ${id} do not exists`);
  }

  static countryWithId(id: number) {
    return new LocationDoNotExistsError(`Country with Id ${id} do not exists`);
  }
}
