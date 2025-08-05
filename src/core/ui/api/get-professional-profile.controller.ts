import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { catchError } from './error.handler';
import { GetInterestHandler } from 'src/core/application/professional-profile/get-tester-interest-command-handler';
import { GetExperienceHandler } from 'src/core/application/professional-profile/get-tester-experience-command-handler';

@Controller()
export class GetProfessionalProfileController {
  constructor(
    private readonly commandHandlerInterest: GetInterestHandler,
    private readonly commandHandlerExperience: GetExperienceHandler,
  ) {}

  @Get('interest')
  async handleCountries(@Res() response: Response) {
    try {
      const countries = await this.commandHandlerInterest.handle();
      response.status(200).send(countries);
    } catch (error) {
      catchError(error, response);
    }
  }

  @Get('experience')
  async handleLanguages(@Res() response: Response) {
    try {
      const languages = await this.commandHandlerExperience.handle();
      response.status(200).send(languages);
    } catch (error) {
      catchError(error, response);
    }
  }
}
