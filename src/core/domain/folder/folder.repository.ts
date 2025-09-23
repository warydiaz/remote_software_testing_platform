import { RepositoryId } from '../repository/id';
import { FolderEntity } from './folder.entity';
import { FolderPath } from './folderPath';
import { FolderTitle } from './folderTitle';
import { FolderId } from './id';

export interface FolderRepository {
  save(folder: FolderEntity): Promise<void>;
  findById(id: FolderId): Promise<FolderEntity | undefined>;
  findAll(): Promise<FolderEntity[]>;
  findByTitleAndRepositoryIdAndPath(
    title: FolderTitle,
    repositoryId: RepositoryId,
    path: FolderPath,
  ): Promise<FolderEntity | undefined>;
  deleteById(id: FolderId): Promise<void>;
  update(folder: FolderEntity): Promise<void>;
  findByName(name: string): Promise<FolderEntity | undefined>;
}

export const FOLDER_REPOSITORY = Symbol('FolderRepository');
