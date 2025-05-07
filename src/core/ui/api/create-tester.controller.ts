/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Body, Controller, Post, Res } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { catchError } from './error.handler';
import { RegisterTesterCommandHandler } from 'src/core/application/tester/register-tester.command-handler';
import { RegisterTesterCommand } from 'src/core/application/tester/register-tester.command';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from 'src/core/infrastructure/redis/redis.service';
void ConfigModule.forRoot();

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
  userId: string;
  password: string;
}

@Controller()
export class CreateTesterController {
  constructor(
    private readonly commandHandler: RegisterTesterCommandHandler,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

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
          request.userId,
          request.password,
        ),
      );

      const token = this.jwtService.sign(
        { sub: id, email: request.email },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );

      await this.redisService.set(`auth_token:${id}`, token, 'EX', 3600);

      response.status(201).set('Location', `/testers/${id}`).json({ token });
    } catch (error) {
      catchError(error, response);
      return;
    }
  }
}
