import { Id } from '../id';

export class RepositoryId extends Id {
  constructor(value: string) {
    super(value);
  }

  static create(value: string): RepositoryId {
    this.guardValidId(value);
    return new RepositoryId(value);
  }

  static new(): RepositoryId {
    return new RepositoryId(Id.generate());
  }
}
