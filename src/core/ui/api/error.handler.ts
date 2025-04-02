import { Response } from 'express';
import { CustomerAlreadyExistsError } from '../../application/customer/customer-already-exists.error';
import { BaseError } from '../../../error';

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
    return;
  }

  if (error instanceof CustomerAlreadyExistsError) {
    response.status(409).json(ErrorResponse.fromBaseError(error));
    return;
  }
};
