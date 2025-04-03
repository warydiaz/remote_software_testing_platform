import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './core/config/typeorm.config';
import { CreateCustomerController } from './core/ui/api/create-customer.controller';
import { RegisterCustomerCommandHandler } from './core/application/customer/register-customer.command-handler';
import { CUSTOMER_REPOSITORY } from './core/domain/customer/customer.repository';
import { CustomerTypeOrmRepository } from './core/infrastructure/postgres/customer-repository';
import { CustomerPersistenceEntity } from './core/infrastructure/postgres/entities/customer.persistence.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([CustomerPersistenceEntity]),
  ],
  controllers: [CreateCustomerController],
  providers: [
    RegisterCustomerCommandHandler,
    { provide: CUSTOMER_REPOSITORY, useClass: CustomerTypeOrmRepository },
  ],
})
export class AppModule {}
