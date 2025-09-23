/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CreateFileCommand } from 'src/core/application/file/create-file.command';
import { CreateFileHandler } from 'src/core/application/file/create-file.command-handler';
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

export class CreateFileDto {
  folder_id: string;
  test_id: string;
  tester_id: string;
}

@Controller()
export class CreateFileController {
  constructor(private readonly commandHandler: CreateFileHandler) {}

  @UseGuards(JwtAuthGuard)
  @Post('files')
  async handle(
    @Body() request: CreateFileDto,
    @Request() req,
    @Res() response: Response,
  ) {
    const id = uuidv4();

    try {
      const command = new CreateFileCommand(
        id,
        request.folder_id,
        req.user.userId,
        request.test_id,
      );

      await this.commandHandler.handle(command);

      response.status(201).set('Location', `/files/${id}`).json({ id });
    } catch (error) {
      catchError(error, response);
    }
  }
}
