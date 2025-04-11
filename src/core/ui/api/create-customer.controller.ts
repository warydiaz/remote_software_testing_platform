import { RegisterCustomerCommandHandler } from '../../application/customer/register-customer.command-handler';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterCustomerCommand } from '../../application/customer/register-customer.command';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { catchError } from './error.handler';

export class CreateCustomerDto {
  name: string;
  surname: string;
  email: string;
  companyName: string;
  taxDomicile: string;
  NIF: string;
}

@Controller()
export class CreateCustomerController {
  constructor(
    private readonly commandHandler: RegisterCustomerCommandHandler,
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
        ),
      );
    } catch (error) {
      catchError(error, response);
      return;
    }

    response.set('Location', `/customers/${id}`).send();
  }
}
