import { BaseError } from '../../../error';

export class FileError extends BaseError {
  private constructor(message: string) {
    super('file-error', message);
  }
}
