import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './core/config/typeorm.config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { RedisModule } from './core/infrastructure/redis/redis.module';

// Controllers
import { CreateCustomerController } from './core/ui/api/create-customer.controller';
import { GetLocationController } from './core/ui/api/get-location.controller';
import { GetProfessionalProfileController } from './core/ui/api/get-professional-profile.controller';
import { CreateTesterController } from './core/ui/api/create-tester.controller';
import { CreateProjectController } from './core/ui/api/add-project.controller';
import { HealthCheckController } from './core/ui/api/health-check.controler';
import { CreateTestsController } from './core/ui/api/add-test.controller';

// Command Handlers
import { RegisterCustomerCommandHandler } from './core/application/customer/register-customer.command-handler';
import { GetCountriesHandler } from './core/application/location/get-countries-command-handler';
import { GetLanguagesHandler } from './core/application/location/get-languages-command-handler';
import { GetExperienceHandler } from './core/application/professional-profile/get-tester-experience-command-handler';
import { GetInterestHandler } from './core/application/professional-profile/get-tester-interest-command-handler';
import { RegisterTesterCommandHandler } from './core/application/tester/register-tester.command-handler';
import { AddProjectCommandHandler } from './core/application/project/add-project.command-handler';
import { AddProductCommandHandler } from './core/application/product/add-product.command-handler';
import { CreateTestWithStepsHandler } from './core/application/test/create-test-with-steps.command-handler';
import { CreateTestWithoutStepsHandler } from './core/application/test/create-test-without-steps.command-handler';
import { CreateExploratoryTestHandler } from './core/application/test/create-exploratory-test.command-handler';

// Domain Repositories
import { CUSTOMER_REPOSITORY } from './core/domain/customer/customer.repository';
import { LOCATION_REPOSITORY } from './core/domain/location/location.repository';
import { PROFESSIONAL_PROFILE_REPOSITORY } from './core/domain/professional-profile/professional-profile.repository';
import { TESTER_REPOSITORY } from './core/domain/tester/tester.repository';
import { PROJECT_REPOSITORY } from './core/domain/project/project.repository';
import { PRODUCT_REPOSITORY } from './core/domain/product/product.repository';
import { TEST_REPOSITORY } from './core/domain/test/test.repository';
import { USER_REPOSITORY } from './core/domain/user/user.repository';

// TypeORM Repositories
import { CustomerTypeOrmRepository } from './core/infrastructure/postgres/customer-repository';
import { LocationTypeOrmRepository } from './core/infrastructure/postgres/location-repository';
import { ProfessionalProfileTypeOrmRepository } from './core/infrastructure/postgres/professional-profile-repository';
import { TesterTypeOrmRepository } from './core/infrastructure/postgres/tester-repository';
import { ProjectTypeOrmRepository } from './core/infrastructure/postgres/project-repository';
import { ProductTypeOrmRepository } from './core/infrastructure/postgres/product-repository';
import { TestTypeOrmRepository } from './core/infrastructure/postgres/test-repository';
import { UserTypeOrmRepository } from './core/infrastructure/postgres/user-repository';

// Entities
import { CustomerPersistenceEntity } from './core/infrastructure/postgres/entities/customer.persistence.entity';
import { CountriesPersistenceEntity } from './core/infrastructure/postgres/entities/countries.persistence.entity';
import { LanguagesPersistenceEntity } from './core/infrastructure/postgres/entities/language.persistence.entity';
import { ExperiencePersistenceEntity } from './core/infrastructure/postgres/entities/experience.persistence.entity';
import { InterestPersistenceEntity } from './core/infrastructure/postgres/entities/interest.persistence.entity';
import { TesterPersistenceEntity } from './core/infrastructure/postgres/entities/tester.persistence.entity';
import { UserPersistenceEntity } from './core/infrastructure/postgres/entities/user.persistence.entity';
import { ProjectPersistenceEntity } from './core/infrastructure/postgres/entities/project.persistence.entity';
import { ProductPersistenceEntity } from './core/infrastructure/postgres/entities/product.persistence.entity';
import { TestPersistenceEntity } from './core/infrastructure/postgres/entities/test.persistence.entity';
import { TestStepPersistenceEntity } from './core/infrastructure/postgres/entities/test-step.persistence.entity';

// Auth
import { JwtStrategy } from './core/infrastructure/auth/jwt.strategy';
import { TestTypePersistenceEntity } from './core/infrastructure/postgres/entities/testType.persistence.entity';
import { CreateRepositoryHandler } from './core/application/repository/create-repository.command-handler';
import { REPOSITORY_REPOSITORY } from './core/domain/repository/repository.repository';
import { RepositoryTypeOrmRepository } from './core/infrastructure/postgres/repository-repository';
import { RepositoryPersistenceEntity } from './core/infrastructure/postgres/entities/repository.persistence.entity';
import { CreateRepositoryController } from './core/ui/api/add-repository.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([
      CustomerPersistenceEntity,
      CountriesPersistenceEntity,
      LanguagesPersistenceEntity,
      ExperiencePersistenceEntity,
      InterestPersistenceEntity,
      TesterPersistenceEntity,
      UserPersistenceEntity,
      ProjectPersistenceEntity,
      ProductPersistenceEntity,
      TestPersistenceEntity,
      TestTypePersistenceEntity,
      TestStepPersistenceEntity,
      RepositoryPersistenceEntity,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    RedisModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 20000,
          limit: 2,
        },
      ],
    }),
  ],
  controllers: [
    CreateCustomerController,
    GetLocationController,
    GetProfessionalProfileController,
    CreateTesterController,
    CreateProjectController,
    HealthCheckController,
    CreateTestsController,
    CreateRepositoryController,
  ],
  providers: [
    // Command Handlers
    RegisterCustomerCommandHandler,
    GetCountriesHandler,
    GetLanguagesHandler,
    GetExperienceHandler,
    GetInterestHandler,
    RegisterTesterCommandHandler,
    AddProjectCommandHandler,
    AddProductCommandHandler,
    CreateTestWithStepsHandler,
    CreateTestWithoutStepsHandler,
    CreateExploratoryTestHandler,
    CreateRepositoryHandler,

    // Repositories
    { provide: CUSTOMER_REPOSITORY, useClass: CustomerTypeOrmRepository },
    { provide: LOCATION_REPOSITORY, useClass: LocationTypeOrmRepository },
    {
      provide: PROFESSIONAL_PROFILE_REPOSITORY,
      useClass: ProfessionalProfileTypeOrmRepository,
    },
    { provide: TESTER_REPOSITORY, useClass: TesterTypeOrmRepository },
    { provide: PROJECT_REPOSITORY, useClass: ProjectTypeOrmRepository },
    { provide: PRODUCT_REPOSITORY, useClass: ProductTypeOrmRepository },
    { provide: TEST_REPOSITORY, useClass: TestTypeOrmRepository },
    { provide: USER_REPOSITORY, useClass: UserTypeOrmRepository },
    { provide: REPOSITORY_REPOSITORY, useClass: RepositoryTypeOrmRepository },
    // Auth & Guards
    JwtStrategy,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
