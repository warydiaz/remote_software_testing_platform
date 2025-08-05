import { Id } from '../id';

export class ProjectId extends Id {
  constructor(value: string) {
    super(value);
  }

  static create(value: string): ProjectId {
    this.guardValidId(value);
    return new ProjectId(value);
  }

  static new(): ProjectId {
    return new ProjectId(Id.generate());
  }
}
