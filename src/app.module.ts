import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './core/config/typeorm.config';
import { CreateCustomerController } from './core/ui/api/create-customer.controller';
import { RegisterCustomerCommandHandler } from './core/application/customer/register-customer.command-handler';
import { CUSTOMER_REPOSITORY } from './core/domain/customer/customer.repository';
import { CustomerTypeOrmRepository } from './core/infrastructure/postgres/customer-repository';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot(), // Cargar variables de entorno
    TypeOrmModule.forRoot(typeOrmConfig), // Importar la configuración de TypeORM
  ],
  controllers: [CreateCustomerController],
  providers: [
    RegisterCustomerCommandHandler,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    { provide: CUSTOMER_REPOSITORY, useClass: CustomerTypeOrmRepository },
  ],
})
export class AppModule {}
