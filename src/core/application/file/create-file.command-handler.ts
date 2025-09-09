import { Inject } from '@nestjs/common';
import {
  FILE_REPOSITORY,
  FileRepository,
} from '../../domain/file/file.repository';
import { FileValuesError } from './file.error';
import { FolderId } from '../../domain/folder/id';
import {
  FOLDER_REPOSITORY,
  FolderRepository,
} from '../../domain/folder/folder.repository';
import { CreateFileCommand } from './create-file.command';
import { TestId } from '../../domain/test/id';
import {
  TEST_REPOSITORY,
  TestRepository,
} from '../../domain/test/test.repository';
import { FileEntity } from '../../domain/file/file.entity';

export class CreateFileHandler {
  constructor(
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: FileRepository,
    @Inject(FOLDER_REPOSITORY)
    private readonly folderRepository: FolderRepository,
    @Inject(TEST_REPOSITORY)
    private readonly testRepository: TestRepository,
  ) {}

  async handle(command: CreateFileCommand): Promise<void> {
    if (!command.folder_id) {
      throw FileValuesError.withFolderIdEmpty();
    }

    if (!command.test_id) {
      throw FileValuesError.withTestIdEmpty();
    }

    const folderId = FolderId.create(command.folder_id);
    const existFolder = await this.folderRepository.findById(folderId);

    if (!existFolder) {
      throw FileValuesError.withFolderId(folderId.value);
    }

    const testId = TestId.create(command.test_id);
    const existTest = await this.testRepository.findById(testId);

    if (!existTest) {
      throw FileValuesError.withTestId(testId.value);
    }

    const existFile = await this.fileRepository.findByFolderAndTest(
      folderId,
      testId,
    );

    if (existFile) {
      throw FileValuesError.withFolderWithTestId(testId.value, folderId.value);
    }

    const file = FileEntity.create(
      command.id,
      command.folder_id,
      command.tester_id,
      command.test_id,
    );

    await this.fileRepository.save(file);
  }
}
