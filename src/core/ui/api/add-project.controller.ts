import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AddProjectCommandHandler } from '../../application/project/add-project.command-handler';
import { AddProjectCommand } from '../../application/project/add-project.command';
import { v4 as uuidv4 } from 'uuid';
import { catchError } from './error.handler';
import { JwtAuthGuard } from 'src/core/infrastructure/auth/jwt-auth.guard';

export class CreateProjectDto {
  name: string;
  description: string;
  email: string;
  product: string;
  startDate: string;
  endDate: string;
  testType: number[];
}

@Controller()
export class CreateProjectController {
  constructor(private readonly commandHandler: AddProjectCommandHandler) {}

  @UseGuards(JwtAuthGuard)
  @Post('projects')
  async handle(@Body() request: CreateProjectDto, @Res() response: Response) {
    const id = uuidv4();

    try {
      const startDate = new Date(request.startDate);
      const endDate = new Date(request.endDate);

      const command = new AddProjectCommand(
        id,
        request.name,
        request.description,
        request.email,
        request.product,
        startDate,
        endDate,
        request.testType,
      );

      await this.commandHandler.handle(command);

      response.status(201).set('Location', `/projects/${id}`).json({ id });
    } catch (error) {
      catchError(error, response);
    }
  }
}
