import { Response } from 'express';
import { CustomerAlreadyExistsError } from '../../application/customer/customer-already-exists.error';
import { BaseError } from '../../../error';
import { InvalidFieldError } from '../../domain/invalid-field.error';
import { InvalidNIFError } from '../../domain/customer/invalid-nif.error';
import { InvalidEmailError } from '../../domain/customer/invalid-email.error';
import { InvalidBirthDateError } from '../../domain/tester/invalid-birthdate.error';
import { TesterAlreadyExistsError } from '../../application/tester/tester-already-exists.error';
import { TooManyRequestsError } from '../../infrastructure/errors/too-many-requests.error';
import { UnauthorizedExceptionError } from '../../infrastructure/errors/unauthorized-exception.error';
import { EnvironmentNotFoundError } from '../../application/product/invalid-environment-value.error';
import { ProjectNotFoundError } from '../../application/product/project-not-found.error';
import { ProductAlreadyExistsError } from '../../application/product/product-already-exists.error';
import { InvalidProductDatesError } from '../../application/product/invalid-product-dates.error';
import { ProjectError } from '../../domain/project/project.error';
import { InvalidStepError } from '../../domain/test/invalid-test-step.error';
import { InvalidPriorityError } from '../../domain/test/invalid-test-priority.error';
import { TestError } from '../../domain/test/test.error';
import { RepositoryAlreadyExistsError } from 'src/core/application/repository/customer-repository-exists.error';
import { RepositoryError } from 'src/core/domain/repository/repository.error';
import { FolderAlreadyExistsError } from 'src/core/application/folder/folder-exists.error';
import { FolderError } from 'src/core/domain/folder/folder.error';

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
    error instanceof ProductAlreadyExistsError ||
    error instanceof RepositoryAlreadyExistsError ||
    error instanceof FolderAlreadyExistsError
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
    error instanceof InvalidStepError ||
    error instanceof InvalidPriorityError ||
    error instanceof TestError ||
    error instanceof RepositoryError ||
    error instanceof FolderError
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
