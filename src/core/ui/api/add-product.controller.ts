import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { catchError } from './error.handler';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { AddProductCommandHandler } from '../../application/product/add-product.command-handler';
import { AddProductCommand } from '../../application/product/add-product.command';

export class CreateProductDto {
  projectId: string;
  name: string;
  description: string;
  cycleStartDate: Date;
  cycleEndDate: Date;
  environment: string;
}

@Controller()
export class CreateProductController {
  constructor(private readonly commandHandler: AddProductCommandHandler) {}

  @UseGuards(JwtAuthGuard)
  @Post('products')
  async handle(@Body() request: CreateProductDto, @Res() response: Response) {
    const id = uuidv4();

    try {
      const startDate = new Date(request.cycleStartDate);
      const endDate = new Date(request.cycleEndDate);

      await this.commandHandler.handle(
        new AddProductCommand(
          id,
          request.projectId,
          request.name,
          request.description,
          startDate,
          endDate,
          request.environment,
        ),
      );

      response.status(201).set('Location', `/products/${id}`).json({ id });
    } catch (error) {
      catchError(error, response);
    }
  }
}
