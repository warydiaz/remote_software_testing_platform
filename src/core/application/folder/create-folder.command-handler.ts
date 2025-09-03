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

export class CreateFolderHandler {
  constructor(
    @Inject(FOLDER_REPOSITORY)
    private readonly folderRepository: FolderRepository,
  ) {}

  async handle(command: CreateFolderCommand): Promise<void> {
    const title = FolderTitle.create(command.title);
    const repositoryId = RepositoryId.create(command.repository_id);

    const existFolder = await this.folderRepository.findByTitleAndRepositoryId(
      title,
      repositoryId,
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
