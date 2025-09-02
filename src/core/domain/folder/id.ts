import { Id } from '../id';

export class FolderId extends Id {
  constructor(value: string) {
    super(value);
  }

  static create(value: string): FolderId {
    this.guardValidId(value);
    return new FolderId(value);
  }

  static new(): FolderId {
    return new FolderId(Id.generate());
  }
}
