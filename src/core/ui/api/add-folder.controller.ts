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
import { CreateFolderHandler } from '../../application/folder/create-folder.command-handler';
import { CreateFolderCommand } from '../../application/folder/create-folder.command';

export class CreateFolderDto {
  title: string;
  description: string;
  repository_id: string;
  path: string;
}

@Controller()
export class CreateFolderController {
  constructor(private readonly commandHandler: CreateFolderHandler) {}

  @UseGuards(JwtAuthGuard)
  @Post('folders')
  async handle(
    @Body() request: CreateFolderDto,
    @Request() req,
    @Res() response: Response,
  ) {
    const id = uuidv4();

    try {
      const command = new CreateFolderCommand(
        id,
        request.title,
        request.repository_id,
        request.path,
        req.user.userId,
        request.description,
      );

      await this.commandHandler.handle(command);

      response.status(201).set('Location', `/folders/${id}`).json({ id });
    } catch (error) {
      catchError(error, response);
    }
  }
}
