import { Inject } from '@nestjs/common';
import { RepositoryId } from '../../domain/repository/id';
import { CreateFolderCommand } from './create-folder.command';
import { FolderEmptyValuesError } from './folder.error';
import { FolderEntity } from '../../domain/folder/folder.entity';
import {
  FOLDER_REPOSITORY,
  FolderRepository,
} from '../../domain/folder/folder.repository';
import { FolderTitle } from '../../domain/folder/folderTitle';
import { FolderPath } from 'src/core/domain/folder/folderPath';
import {
  REPOSITORY_REPOSITORY,
  RepositoryRepository,
} from 'src/core/domain/repository/repository.repository';

export class CreateFolderHandler {
  constructor(
    @Inject(FOLDER_REPOSITORY)
    private readonly folderRepository: FolderRepository,
    @Inject(REPOSITORY_REPOSITORY)
    private readonly repositoryRepository: RepositoryRepository,
  ) {}

  async handle(command: CreateFolderCommand): Promise<void> {
    const repositoryId = RepositoryId.create(command.repository_id);
    const existRepository =
      await this.repositoryRepository.findById(repositoryId);

    if (!existRepository) {
      throw FolderEmptyValuesError.withRepositoryId(command.repository_id);
    }

    const title = FolderTitle.create(command.title);
    const path = FolderPath.create(command.path);

    const existFolder =
      await this.folderRepository.findByTitleAndRepositoryIdAndPath(
        title,
        repositoryId,
        path,
      );

    if (existFolder) {
      throw FolderEmptyValuesError.withTitle(command.title);
    }

    const folder = FolderEntity.create(
      command.id,
      command.title,
      command.tester_id,
      command.repository_id,
      command.path,
      command.description,
    );

    await this.folderRepository.save(folder);
  }
}
