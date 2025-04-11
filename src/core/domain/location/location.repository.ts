import { CountryEntity } from './country.entity';

export interface LocationRepository {
  findAllCountries(): Promise<CountryEntity[]>;
}

export const LOCATION_REPOSITORY = Symbol('LocationRepository');
