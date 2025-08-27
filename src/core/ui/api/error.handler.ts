import { Response } from 'express';
import { CustomerAlreadyExistsError } from '../../application/customer/customer-already-exists.error';
import { BaseError } from '../../../error';
import { InvalidFieldError } from 'src/core/domain/invalid-field.error';
import { InvalidNIFError } from 'src/core/domain/customer/invalid-nif.error';
import { InvalidEmailError } from 'src/core/domain/customer/invalid-email.error';
import { InvalidBirthDateError } from 'src/core/domain/tester/invalid-birthdate.error';
import { TesterAlreadyExistsError } from 'src/core/application/tester/tester-already-exists.error';
import { TooManyRequestsError } from 'src/core/infrastructure/errors/too-many-requests.error';
import { UnauthorizedExceptionError } from 'src/core/infrastructure/errors/unauthorized-exception.error';
import { EnvironmentNotFoundError } from 'src/core/application/product/invalid-environment-value.error';
import { ProjectNotFoundError } from 'src/core/application/product/project-not-found.error';
import { ProductAlreadyExistsError } from 'src/core/application/product/product-already-exists.error';
import { InvalidProductDatesError } from 'src/core/application/product/invalid-product-dates.error';
import { ProjectError } from 'src/core/domain/project/project.error';
import { InvalidStepError } from 'src/core/domain/test/invalid-test-step.error';

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
    error instanceof TesterAlreadyExistsError ||
    error instanceof ProductAlreadyExistsError
  ) {
    response.status(409).json(ErrorResponse.fromBaseError(error));
  }

  if (
    error instanceof InvalidFieldError ||
    error instanceof InvalidNIFError ||
    error instanceof InvalidEmailError ||
    error instanceof InvalidBirthDateError ||
    error instanceof EnvironmentNotFoundError ||
    error instanceof ProjectNotFoundError ||
    error instanceof InvalidProductDatesError ||
    error instanceof ProjectError ||
    error instanceof InvalidStepError
  ) {
    response.status(400).json(ErrorResponse.fromBaseError(error));
  }

  if (error instanceof UnauthorizedExceptionError) {
    response.status(401).json(ErrorResponse.fromBaseError(error));
  }

  if (error instanceof TooManyRequestsError) {
    return response.status(429).json(ErrorResponse.fromBaseError(error));
  }
};
