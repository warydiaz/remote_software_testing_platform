import { Body, Controller, Post, Res } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { catchError } from './error.handler';
import { RegisterTesterCommandHandler } from 'src/core/application/tester/register-tester.command-handler';
import { RegisterTesterCommand } from 'src/core/application/tester/register-tester.command';

export class CreateTesterDto {
  name: string;
  surname: string;
  email: string;
  birth_date: Date;
  language: number;
  city: string;
  postal_code: string;
  country: number;
  experience_level: number;
  interests: number[];
}

@Controller()
export class CreateTesterController {
  constructor(private readonly commandHandler: RegisterTesterCommandHandler) {}

  @Post('testers')
  async handle(@Body() request: CreateTesterDto, @Res() response: Response) {
    const id = uuidv4();

    try {
      await this.commandHandler.handle(
        new RegisterTesterCommand(
          id,
          request.name,
          request.surname,
          request.email,
          request.birth_date,
          request.language,
          request.city,
          request.postal_code,
          request.country,
          request.experience_level,
          request.interests,
        ),
      );
    } catch (error) {
      catchError(error, response);
      return;
    }

    response.set('Location', `/testers/${id}`).send();
  }
}
