import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from '../../domain/location/country.entity';
import { LocationRepository } from 'src/core/domain/location/location.repository';
import { CountriesPersistenceEntity } from './entities/countries.persistence.entity';

@Injectable()
export class LocationTypeOrmRepository implements LocationRepository {
  constructor(
    @InjectRepository(CountriesPersistenceEntity)
    private readonly repository: Repository<CountriesPersistenceEntity>,
  ) {}

  async findAllCountries(): Promise<CountryEntity[]> {
    const dbCountries = await this.repository.find();
    return dbCountries ? this.toDomain(dbCountries) : [];
  }
  private toDomain(dbCountries: CountriesPersistenceEntity[]): CountryEntity[] {
    return dbCountries.map((dbCountry) =>
      CountryEntity.create(dbCountry.id, dbCountry.code, dbCountry.name),
    );
  }
}
