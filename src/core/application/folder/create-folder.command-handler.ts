import { Inject } from '@nestjs/common';
import { RepositoryId } from '../../domain/repository/id';
import { CreateFolderCommand } from './create-folder.command';
import { FolderAlreadyExistsError } from './folder-exists.error';
import { FolderEntity } from '../../domain/folder/folder.entity';
import {
  FOLDER_REPOSITORY,
  FolderRepository,
} from '../../domain/folder/folder.repository';
import { FolderTitle } from '../../domain/folder/folderTitle';
import { FolderPath } from 'src/core/domain/folder/folderPath';

export class CreateFolderHandler {
  constructor(
    @Inject(FOLDER_REPOSITORY)
    private readonly folderRepository: FolderRepository,
  ) {}

  async handle(command: CreateFolderCommand): Promise<void> {
    const existRepository = await this.folderRepository.findById(
      RepositoryId.create(command.repository_id),
    );

    if (!existRepository) {
      throw FolderAlreadyExistsError.withRepositoryId(command.repository_id);
    }

    if (!command.path) {
      throw FolderAlreadyExistsError.withEmptyPath();
    }

    if (!command.description) {
      throw FolderAlreadyExistsError.withEmptyDescription();
    }

    const title = FolderTitle.create(command.title);
    const repositoryId = RepositoryId.create(command.repository_id);
    const path = FolderPath.create(command.path);

    const existFolder =
      await this.folderRepository.findByTitleAndRepositoryIdAndPath(
        title,
        repositoryId,
        path,
      );

    if (existFolder) {
      throw FolderAlreadyExistsError.withTitle(command.title);
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
