import { LanguageEntity } from './language.entity';
import { CountryEntity } from './country.entity';

export interface LocationRepository {
  findAllCountries(): Promise<CountryEntity[]>;
  findAllLanguages(): Promise<LanguageEntity[]>;
}

export const LOCATION_REPOSITORY = Symbol('LocationRepository');
