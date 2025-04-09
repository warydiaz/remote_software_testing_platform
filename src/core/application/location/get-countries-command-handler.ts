import { Inject, Injectable } from '@nestjs/common';
import {
  LOCATION_REPOSITORY,
  LocationRepository,
} from '../../domain/location/location.repository';
import { CountryEntity } from '../../domain/location/country.entity';

@Injectable()
export class GetCountriesHandler {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly repository: LocationRepository,
  ) {}

  async handle(): Promise<CountryEntity[]> {
    return await this.repository.findAllCountries();
  }
}
