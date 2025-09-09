import { FolderId } from '../folder/id';
import { TestId } from '../test/id';
import { FileEntity } from './file.entity';
import { FileId } from './id';

export interface FileRepository {
  save(file: FileEntity): Promise<void>;
  findById(id: FileId): Promise<FileEntity | undefined>;
  findAll(): Promise<FileEntity[]>;
  findByFolderAndTest(
    folderId: FolderId,
    testId: TestId,
  ): Promise<FileEntity | undefined>;
  deleteById(id: FileId): Promise<void>;
  update(file: FileEntity): Promise<void>;
}

export const FILE_REPOSITORY = Symbol('FileRepository');
