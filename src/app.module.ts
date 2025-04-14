import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './core/config/typeorm.config';
import { CreateCustomerController } from './core/ui/api/create-customer.controller';
import { RegisterCustomerCommandHandler } from './core/application/customer/register-customer.command-handler';
import { CUSTOMER_REPOSITORY } from './core/domain/customer/customer.repository';
import { CustomerTypeOrmRepository } from './core/infrastructure/postgres/customer-repository';
import { CustomerPersistenceEntity } from './core/infrastructure/postgres/entities/customer.persistence.entity';
import { CountriesPersistenceEntity } from './core/infrastructure/postgres/entities/countries.persistence.entity';
import { GetLocationController } from './core/ui/api/get-location.controller';
import { GetCountriesHandler } from './core/application/location/get-countries-command-handler';
import { LOCATION_REPOSITORY } from './core/domain/location/location.repository';
import { LocationTypeOrmRepository } from './core/infrastructure/postgres/location-repository';
import { GetLanguagesHandler } from './core/application/location/get-languages-command-handler';
import { LanguagesPersistenceEntity } from './core/infrastructure/postgres/entities/language.persistence.entity';
import { ExperiencePersistenceEntity } from './core/infrastructure/postgres/entities/experience.persistence.entity';
import { InterestPersistenceEntity } from './core/infrastructure/postgres/entities/interest.persistence.entity';
import { GetProfessionalProfileController } from './core/ui/api/get-professional-profile.controller';
import { GetExperienceHandler } from './core/application/professional-profile/get-tester-experience-command-handler';
import { PROFESSIONAL_PROFILE_REPOSITORY } from './core/domain/professional-profile/professional-profile.repository';
import { ProfessionalProfileTypeOrmRepository } from './core/infrastructure/postgres/professional-profile-repository';
import { GetInterestHandler } from './core/application/professional-profile/get-tester-interest-command-handler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([CustomerPersistenceEntity]),
    TypeOrmModule.forFeature([CountriesPersistenceEntity]),
    TypeOrmModule.forFeature([LanguagesPersistenceEntity]),
    TypeOrmModule.forFeature([ExperiencePersistenceEntity]),
    TypeOrmModule.forFeature([InterestPersistenceEntity]),
  ],
  controllers: [
    CreateCustomerController,
    GetLocationController,
    GetProfessionalProfileController,
  ],
  providers: [
    RegisterCustomerCommandHandler,
    { provide: CUSTOMER_REPOSITORY, useClass: CustomerTypeOrmRepository },
    GetCountriesHandler,
    {
      provide: LOCATION_REPOSITORY,
      useClass: LocationTypeOrmRepository,
    },
    GetLanguagesHandler,
    {
      provide: LOCATION_REPOSITORY,
      useClass: LocationTypeOrmRepository,
    },
    GetExperienceHandler,
    {
      provide: PROFESSIONAL_PROFILE_REPOSITORY,
      useClass: ProfessionalProfileTypeOrmRepository,
    },
    GetInterestHandler,
    {
      provide: PROFESSIONAL_PROFILE_REPOSITORY,
      useClass: ProfessionalProfileTypeOrmRepository,
    },
  ],
})
export class AppModule {}
