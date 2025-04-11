import { LanguagesPersistenceEntity } from 'src/core/infrastructure/postgres/entities/language.persistence.entity';
import { CountryEntity } from './country.entity';

export interface LocationRepository {
  findAllCountries(): Promise<CountryEntity[]>;
  findAllLanguages(): Promise<LanguagesPersistenceEntity[]>;
}

export const LOCATION_REPOSITORY = Symbol('LocationRepository');
