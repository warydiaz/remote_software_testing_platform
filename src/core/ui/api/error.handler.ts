import { Response } from 'express';
import { CustomerAlreadyExistsError } from '../../application/customer/customer-already-exists.error';
import { BaseError } from '../../../error';
import { InvalidFieldError } from 'src/core/domain/invalid-field.error';
import { InvalidNIFError } from 'src/core/domain/customer/invalid-nif.error';
import { InvalidEmailError } from 'src/core/domain/customer/invalid-email.error';
import { InvalidBirthDateError } from 'src/core/domain/tester/invalid-birthdate.error';
import { TesterAlreadyExistsError } from 'src/core/application/tester/tester-already-exists.error';
import { TooManyRequestsError } from 'src/core/infrastructure/errors/too-many-requests.error';
import { ThrottlerException } from '@nestjs/throttler';

export class ErrorResponse {
  code: string;
  message: string;

  static fromBaseError(error: BaseError): ErrorResponse {
    return {
      code: error.code,
      message: error.message,
    };
  }

  static internalServerError(error: Error): ErrorResponse {
    return {
      code: 'internal-server-error',
      message: error.message,
    };
  }
}

export const catchError = (error: Error, response: Response) => {
  if (!(error instanceof BaseError)) {
    response.status(500).json(ErrorResponse.internalServerError(error));
  }

  if (
    error instanceof CustomerAlreadyExistsError ||
    error instanceof TesterAlreadyExistsError
  ) {
    response.status(409).json(ErrorResponse.fromBaseError(error));
  }

  if (
    error instanceof InvalidFieldError ||
    error instanceof InvalidNIFError ||
    error instanceof InvalidEmailError ||
    error instanceof InvalidBirthDateError
  ) {
    response.status(400).json(ErrorResponse.fromBaseError(error));
  }

  if (error instanceof ThrottlerException) {
    const mapped = new TooManyRequestsError();
    return response.status(429).json(ErrorResponse.fromBaseError(mapped));
  }
};
