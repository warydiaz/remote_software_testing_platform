import { CountryEntity } from './country.entity';

export interface LocationRepository {
  findAll(): Promise<[CountryEntity]>;
}

export const LOCATION_REPOSITORY = Symbol('LocationRepository');
