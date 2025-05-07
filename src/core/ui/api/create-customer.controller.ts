import { RegisterCustomerCommandHandler } from '../../application/customer/register-customer.command-handler';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterCustomerCommand } from '../../application/customer/register-customer.command';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { catchError } from './error.handler';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from 'src/core/infrastructure/redis/redis.service';
void ConfigModule.forRoot();

export class CreateCustomerDto {
  name: string;
  surname: string;
  email: string;
  companyName: string;
  taxDomicile: string;
  NIF: string;
  userId: string;
  password: string;
}

@Controller()
export class CreateCustomerController {
  constructor(
    private readonly commandHandler: RegisterCustomerCommandHandler,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  @Post('customers')
  async handle(@Body() request: CreateCustomerDto, @Res() response: Response) {
    const id = uuidv4();

    try {
      await this.commandHandler.handle(
        new RegisterCustomerCommand(
          id,
          request.name,
          request.surname,
          request.email,
          request.companyName,
          request.taxDomicile,
          request.NIF,
          request.userId,
          request.password,
        ),
      );

      const token = this.jwtService.sign(
        { sub: id, email: request.email },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );

      await this.redisService.set(`auth_token:${id}`, token, 'EX', 3600);

      response.status(201).set('Location', `/customers/${id}`).json({ token });
    } catch (error) {
      catchError(error, response);
      return;
    }

    response.set('Location', `/customers/${id}`).send();
  }
}
