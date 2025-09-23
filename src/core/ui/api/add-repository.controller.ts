/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Post,
  Body,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { catchError } from './error.handler';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { CreateRepositoryHandler } from '../../application/repository/create-repository.command-handler';
import { CreateRepositoryCommand } from '../../application/repository/create-repository.command';

export class CreateRepositoryDto {
  title: string;
  description: string;
}

@Controller()
export class CreateRepositoryController {
  constructor(private readonly commandHandler: CreateRepositoryHandler) {}

  @UseGuards(JwtAuthGuard)
  @Post('repositories')
  async handle(
    @Body() request: CreateRepositoryDto,
    @Request() req,
    @Res() response: Response,
  ) {
    const id = uuidv4();

    try {
      const command = new CreateRepositoryCommand(
        id,
        request.title,
        req.user.userId,
        request.description,
      );

      await this.commandHandler.handle(command);

      response.status(201).set('Location', `/repositories/${id}`).json({ id });
    } catch (error) {
      catchError(error, response);
    }
  }
}
