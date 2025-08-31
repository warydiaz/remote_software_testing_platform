/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { catchError } from './error.handler';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import {
  CreateExploratoryTestCommand,
  CreateTestWithStepsCommand,
  CreateTestWithoutStepsCommand,
} from '../../application/test/create-test.command';
import { CreateTestWithoutStepsHandler } from '../../application/test/create-test-without-steps.command-handler';
import { CreateTestWithStepsHandler } from '../../application/test/create-test-with-steps.command-handler';
import { CreateExploratoryTestHandler } from '../../application/test/create-exploratory-test.command-handler';

class BaseTestDto {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  isAutomated: boolean;
  isRegression: boolean;
  requirement: string;
  sprint: string;
}

export class CreateTestWithStepsDto extends BaseTestDto {
  steps: [];
}

export class CreateTestWithoutStepsDto extends BaseTestDto {
  expectedResult: string;
}

export class CreateExploratoryTestDTO extends BaseTestDto {}

@Controller()
export class CreateProjectController {
  constructor(
    private readonly commandHandlerTestWithSteps: CreateTestWithStepsHandler,
    private readonly commandHandlerTestWithoutSteps: CreateTestWithoutStepsHandler,
    private readonly commandHandlerTestExploratory: CreateExploratoryTestHandler,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('testWithSteps')
  async handleTestWithSteps(
    @Body() request: CreateTestWithStepsDto,
    @Res() response: Response,
  ) {
    return this.executeCommand(
      this.commandHandlerTestWithSteps,
      new CreateTestWithStepsCommand(
        uuidv4(),
        request.title,
        request.description,
        request.priority,
        request.isAutomated,
        request.isRegression,
        request.requirement,
        request.sprint,
        request.steps,
      ),
      'testWithSteps',
      response,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('testWithoutSteps')
  async handleTestWithoutSteps(
    @Body() request: CreateTestWithoutStepsDto,
    @Res() response: Response,
  ) {
    return this.executeCommand(
      this.commandHandlerTestWithoutSteps,
      new CreateTestWithoutStepsCommand(
        uuidv4(),
        request.title,
        request.description,
        request.priority,
        request.isAutomated,
        request.isRegression,
        request.requirement,
        request.sprint,
        request.expectedResult,
      ),
      'testWithoutSteps',
      response,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('exploratoryTest')
  async handleExploratoryTest(
    @Body() request: CreateExploratoryTestDTO,
    @Res() response: Response,
  ) {
    return this.executeCommand(
      this.commandHandlerTestExploratory,
      new CreateExploratoryTestCommand(
        uuidv4(),
        request.title,
        request.description,
        request.priority,
        request.isAutomated,
        request.isRegression,
        request.requirement,
        request.sprint,
      ),
      'exploratoryTest',
      response,
    );
  }

  private async executeCommand<T>(
    handler: { handle: (command: T) => Promise<void> },
    command: T,
    route: string,
    response: Response,
  ) {
    const id = (command as any).id;
    try {
      await handler.handle(command);
      response.status(201).set('Location', `/${route}/${id}`).json({ id });
    } catch (error) {
      catchError(error, response);
    }
  }
}
