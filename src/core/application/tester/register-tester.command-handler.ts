import { RegisterTesterCommand } from './register-tester.command';
import { Inject, Injectable } from '@nestjs/common';
import {
  LOCATION_REPOSITORY,
  LocationRepository,
} from '../../domain/location/location.repository';
import {
  TESTER_REPOSITORY,
  TesterRepository,
} from '../../domain/tester/tester.repository';

import { TesterAlreadyExistsError } from './tester-already-exists.error';
import { Email } from 'src/core/domain/email';
import { TesterEntity } from 'src/core/domain/tester/tester.entity';
import { LocationDoNotExistsError } from './location-do-not-exists.error';
import { ProfessionalProfileDoNotExistsError } from './professional-profile-do-not-exists.error';

@Injectable()
export class RegisterTesterCommandHandler {
  constructor(
    @Inject(TESTER_REPOSITORY)
    private readonly testesRepository: TesterRepository,
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: LocationRepository,
  ) {}

  async handle(command: RegisterTesterCommand) {
    const email = Email.create(command.email);

    if (await this.testesRepository.findByEmail(email)) {
      throw TesterAlreadyExistsError.withEmail(command.email);
    }

    if (await this.locationRepository.findLanguageById(command.language)) {
      throw LocationDoNotExistsError.languageWithId(command.language);
    }

    if (await this.locationRepository.findCountryById(command.country)) {
      throw LocationDoNotExistsError.countryWithId(command.country);
    }

    const interests = await this.testesRepository.findInterests(
      command.interests,
    );

    if (interests.length > 0) {
      throw ProfessionalProfileDoNotExistsError.interestWithId(
        command.interests,
      );
    }

    if (
      await this.testesRepository.finExperienceLevel(command.experience_level)
    ) {
      throw ProfessionalProfileDoNotExistsError.experienceLevelWithId(
        command.experience_level,
      );
    }

    const tester = TesterEntity.create(
      command.id,
      command.name,
      command.surname,
      command.email,
      command.birth_date,
      command.language,
      command.city,
      command.postal_code,
      command.country,
      command.experience_level,
      command.interests,
    );

    this.testesRepository.save(tester);
  }
}
