import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { catchError } from './error.handler';
import { GetCountriesHandler } from '../../application/location/get-countries-command-handler';

@Controller()
export class CreateCustomerController {
  constructor(private readonly commandHandler: GetCountriesHandler) {}

  @Get('countries')
  async handle(@Res() response: Response) {
    try {
      const countries = await this.commandHandler.handle();
      response.status(200).send(countries);
    } catch (error) {
      catchError(error, response);
    }
  }
}
