import { BaseError } from '../../../error';

export class EmptyField extends BaseError {
  private constructor(message: string) {
    super('field-empty', message);
  }

  static fieldNotValue(field: string): EmptyField {
    return new EmptyField(`The field ${field} can not be empty`);
  }
}
