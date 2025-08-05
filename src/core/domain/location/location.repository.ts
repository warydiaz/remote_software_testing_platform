import { LanguageEntity } from './language.entity';
import { CountryEntity } from './country.entity';

export interface LocationRepository {
  findAllCountries(): Promise<CountryEntity[]>;
  findCountryById(id: number): Promise<CountryEntity | null>;
  findAllLanguages(): Promise<LanguageEntity[]>;
  findLanguageById(id: number): Promise<LanguageEntity | null>;
}

export const LOCATION_REPOSITORY = Symbol('LocationRepository');
