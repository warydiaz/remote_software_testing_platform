import { Id } from '../id';

export class FileId extends Id {
  constructor(value: string) {
    super(value);
  }

  static create(value: string): FileId {
    this.guardValidId(value);
    return new FileId(value);
  }

  static new(): FileId {
    return new FileId(Id.generate());
  }
}
