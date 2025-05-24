import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { catchError } from './error.handler';
import { GetCountriesHandler } from '../../application/location/get-countries-command-handler';
import { GetLanguagesHandler } from 'src/core/application/location/get-languages-command-handler';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class GetLocationController {
  constructor(
    private readonly commandHandlerCountries: GetCountriesHandler,
    private readonly commandHandlerLanguages: GetLanguagesHandler,
  ) {}

  @Throttle({ default: { limit: 5, ttl: 60 } })
  @Get('countries')
  async handleCountries(@Res() response: Response) {
    try {
      const countries = await this.commandHandlerCountries.handle();
      response.status(200).send(countries);
    } catch (error) {
      catchError(error, response);
    }
  }

  @Throttle({ default: { limit: 5, ttl: 60 } })
  @Get('languages')
  async handleLanguages(@Res() response: Response) {
    try {
      const languages = await this.commandHandlerLanguages.handle();
      response.status(200).send(languages);
    } catch (error) {
      catchError(error, response);
    }
  }
}
