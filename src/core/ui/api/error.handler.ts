import { Response } from 'express';
import { CustomerAlreadyExistsError } from '../../application/customer/customer-already-exists.error';
import { BaseError } from '../../../error';
import { InvalidCompanyNameError } from 'src/core/domain/customer/invalid-company-name.error';
import { InvalidEmailError } from 'src/core/domain/customer/invalid-email.error';
import { InvalidNameError } from 'src/core/domain/customer/invalid-name.error';
import { InvalidNIFError } from 'src/core/domain/customer/invalid-nif.error';
import { InvalidSurnameError } from 'src/core/domain/customer/invalid-surname.error';
import { InvalidTaxDomicileError } from 'src/core/domain/customer/invalid-tax-domicile.error';

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

  if (error instanceof CustomerAlreadyExistsError) {
    response.status(409).json(ErrorResponse.fromBaseError(error));
  }

  if (
    error instanceof InvalidCompanyNameError ||
    error instanceof InvalidEmailError ||
    error instanceof InvalidNameError ||
    error instanceof InvalidNIFError ||
    error instanceof InvalidSurnameError ||
    error instanceof InvalidTaxDomicileError
  ) {
    response.status(400).json(ErrorResponse.fromBaseError(error));
  }
};
