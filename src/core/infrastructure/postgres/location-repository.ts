import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from '../../domain/location/country.entity';
import { LocationRepository } from 'src/core/domain/location/location.repository';
import { CountriesPersistenceEntity } from './entities/countries.persistence.entity';
import { LanguagesPersistenceEntity } from './entities/language.persistence.entity';
import { LanguageEntity } from 'src/core/domain/location/language.entity';

@Injectable()
export class LocationTypeOrmRepository implements LocationRepository {
  constructor(
    @InjectRepository(CountriesPersistenceEntity)
    private readonly repositoryCountries: Repository<CountriesPersistenceEntity>,
    @InjectRepository(LanguagesPersistenceEntity)
    private readonly repositoryLanguages: Repository<LanguagesPersistenceEntity>,
  ) {}

  async findAllCountries(): Promise<CountryEntity[]> {
    const dbCountries = await this.repositoryCountries.find();
    return dbCountries ? this.toDomainLanguages(dbCountries) : [];
  }

  async findAllLanguages(): Promise<LanguageEntity[]> {
    const dbLanguages = await this.repositoryLanguages.find();
    return dbLanguages ? this.toDomainCountries(dbLanguages) : [];
  }

  private toDomainCountries(
    dbCountries: CountriesPersistenceEntity[],
  ): CountryEntity[] {
    return dbCountries.map((dbCountry) =>
      CountryEntity.create(dbCountry.id, dbCountry.code, dbCountry.name),
    );
  }

  private toDomainLanguages(
    dbLanguages: LanguagesPersistenceEntity[],
  ): LanguageEntity[] {
    return dbLanguages.map((dbLanguage) =>
      CountryEntity.create(dbLanguage.id, dbLanguage.code, dbLanguage.name),
    );
  }
}
