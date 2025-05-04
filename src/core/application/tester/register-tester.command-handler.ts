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
import {
  PROFESSIONAL_PROFILE_REPOSITORY,
  ProfessionalProfileRepository,
} from '../../domain/professional-profile/professional-profile.repository';
import { TesterAlreadyExistsError } from './tester-already-exists.error';
import { Email } from 'src/core/domain/email';
import { TesterEntity } from 'src/core/domain/tester/tester.entity';
import { LocationDoNotExistsError } from './location-do-not-exists.error';
import { ProfessionalProfileDoNotExistsError } from './professional-profile-do-not-exists.error';
import * as bcrypt from 'bcrypt';
import { ConfigModule } from '@nestjs/config';
void ConfigModule.forRoot(); // Cargar .env

@Injectable()
export class RegisterTesterCommandHandler {
  constructor(
    @Inject(TESTER_REPOSITORY)
    private readonly testerRepository: TesterRepository,
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: LocationRepository,
    @Inject(PROFESSIONAL_PROFILE_REPOSITORY)
    private readonly professionalProfileRepository: ProfessionalProfileRepository,
  ) {}

  saltRounds: number = parseInt(process.env.SALT_ROUNDS ?? '10');

  async handle(command: RegisterTesterCommand) {
    const email = Email.create(command.email);

    const alreadyExistTester = await this.testerRepository.findByEmail(email);
    if (alreadyExistTester) {
      throw TesterAlreadyExistsError.withEmail(command.email);
    }

    const existsLanguage = await this.locationRepository.findLanguageById(
      command.language,
    );

    if (!existsLanguage) {
      throw LocationDoNotExistsError.languageWithId(command.language);
    }

    const existsCountry = await this.locationRepository.findCountryById(
      command.country,
    );

    if (!existsCountry) {
      throw LocationDoNotExistsError.countryWithId(command.country);
    }

    const interests =
      await this.professionalProfileRepository.getNonExistingInterestIds(
        command.interests,
      );

    if (interests.length > 0) {
      throw ProfessionalProfileDoNotExistsError.interestWithId(
        command.interests,
      );
    }

    if (
      (await this.professionalProfileRepository.finExperienceLevel(
        command.experience_level,
      )) === null
    ) {
      throw ProfessionalProfileDoNotExistsError.experienceLevelWithId(
        command.experience_level,
      );
    }

    const existUserId = await this.testerRepository.findByUserId(
      command.userId,
    );

    if (existUserId) {
      throw TesterAlreadyExistsError.withUserId(command.userId);
    }

    const hashedPassword = await bcrypt.hash(command.password, this.saltRounds);

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
      command.userId,
      hashedPassword,
    );

    await this.testerRepository.save(tester);
  }
}
