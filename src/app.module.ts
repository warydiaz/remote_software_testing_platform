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
import { GetLocationController } from './core/ui/api/get-countries.controller';
import { GetCountriesHandler } from './core/application/location/get-countries-command-handler';
import { LOCATION_REPOSITORY } from './core/domain/location/location.repository';
import { LocationTypeOrmRepository } from './core/infrastructure/postgres/location-repository';
import { GetLanguagesHandler } from './core/application/location/get-languages-command-handler';
import { LanguagesPersistenceEntity } from './core/infrastructure/postgres/entities/language.persistence.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([CustomerPersistenceEntity]),
    TypeOrmModule.forFeature([CountriesPersistenceEntity]),
    TypeOrmModule.forFeature([LanguagesPersistenceEntity]),
  ],
  controllers: [CreateCustomerController, GetLocationController],
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
  ],
})
export class AppModule {}
