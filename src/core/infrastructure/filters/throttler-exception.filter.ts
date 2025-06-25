// src/core/infrastructure/filters/throttler-exception.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Response } from 'express';
import { TooManyRequestsError } from '../errors/too-many-requests.error';
import { ErrorResponse } from '../../ui/api/error.handler';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const mapped = new TooManyRequestsError();

    response
      .status(HttpStatus.TOO_MANY_REQUESTS)
      .json(ErrorResponse.fromBaseError(mapped));
  }
}
