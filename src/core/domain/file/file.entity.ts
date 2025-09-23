import { FolderId } from '../folder/id';
import { TestId } from '../test/id';
import { TesterId } from '../tester/id';
import { FileId } from './id';

export class FileEntity {
  private constructor(
    public readonly id: FileId,
    public readonly folderId: FolderId,
    public readonly testId: TestId,
    public readonly testerId: TesterId,
  ) {}

  static create(
    id: string,
    folderId: string,
    testId: string,
    testerId: string,
  ): FileEntity {
    return new FileEntity(
      FileId.create(id),
      FolderId.create(folderId),
      TestId.create(testId),
      TesterId.create(testerId),
    );
  }
}
