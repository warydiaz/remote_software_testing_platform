/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
    ConfigModule.forRoot(), // Cargar variables de entorno
    TypeOrmModule.forRoot(typeOrmConfig), // Importar la configuración de TypeORM
    TypeOrmModule.forFeature([CustomerPersistenceEntity]), // 👈 Registrar la entidad en TypeORM
  ],
  controllers: [CreateCustomerController],
  providers: [
    RegisterCustomerCommandHandler,
    { provide: CUSTOMER_REPOSITORY, useClass: CustomerTypeOrmRepository },
  ],
})
export class AppModule {}
