import { FolderId } from '../folder/id';
import { FileEntity } from './file.entity';
import { FileId } from './id';

export interface FileRepository {
  save(file: FileEntity): Promise<void>;
  findById(id: FileEntity): Promise<FileEntity | undefined>;
  findAll(): Promise<FileEntity[]>;
  findByFolder(folderId: FolderId): Promise<FileEntity | undefined>;
  deleteById(id: FileId): Promise<void>;
  update(file: FileEntity): Promise<void>;
}

export const FILE_REPOSITORY = Symbol('FileRepository');
