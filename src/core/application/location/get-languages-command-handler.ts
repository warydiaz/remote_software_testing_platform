import { Inject, Injectable } from '@nestjs/common';
import {
  LOCATION_REPOSITORY,
  LocationRepository,
} from '../../domain/location/location.repository';
import { LanguageEntity } from 'src/core/domain/location/language.entity';

@Injectable()
export class GetLanguagesHandler {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly repository: LocationRepository,
  ) {}

  async handle(): Promise<LanguageEntity[]> {
    return await this.repository.findAllLanguages();
  }
}
