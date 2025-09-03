/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FolderRepository } from '../../domain/folder/folder.repository';
import { FolderEntity } from '../../domain/folder/folder.entity';
import { FolderId } from '../../domain/folder/id';
import { FolderTitle } from '../../domain/folder/folderTitle';
import { RepositoryId } from '../../domain/repository/id';
import { FolderPersistenceEntity } from './entities/folder.persistence.entity';

@Injectable()
export class FolderTypeOrmRepository implements FolderRepository {
  constructor(
    @InjectRepository(FolderPersistenceEntity)
    private readonly folderRepo: Repository<FolderPersistenceEntity>,
  ) {}

  async save(folder: FolderEntity): Promise<void> {
    const dbFolder = new FolderPersistenceEntity();
    dbFolder.id = folder.id.value;
    dbFolder.name = folder.title.value;
    dbFolder.path = folder.path.value;
    dbFolder.description = folder.description.value;

    dbFolder.repository = { id: folder.repositoryId.value } as any;
    dbFolder.tester = { id: folder.testerId.value } as any;

    await this.folderRepo.save(dbFolder);
  }

  async update(folder: FolderEntity): Promise<void> {
    await this.save(folder);
  }

  async findById(id: FolderId): Promise<FolderEntity | undefined> {
    const dbFolder = await this.folderRepo.findOne({
      where: { id: id.value },
      relations: ['repository', 'tester'],
    });
    return dbFolder ? this.toDomain(dbFolder) : undefined;
  }

  async findAll(): Promise<FolderEntity[]> {
    const dbFolders = await this.folderRepo.find({
      relations: ['repository', 'tester'],
    });
    return dbFolders.map(this.toDomain);
  }

  async findByTitleAndRepositoryId(
    title: FolderTitle,
    repositoryId: RepositoryId,
  ): Promise<FolderEntity | undefined> {
    const dbFolder = await this.folderRepo.findOne({
      where: {
        name: title.value,
        repository: { id: repositoryId.value },
      },
      relations: ['repository', 'tester'],
    });
    return dbFolder ? this.toDomain(dbFolder) : undefined;
  }

  async findByName(name: string): Promise<FolderEntity | undefined> {
    const dbFolder = await this.folderRepo.findOne({
      where: { name },
      relations: ['repository', 'tester'],
    });
    return dbFolder ? this.toDomain(dbFolder) : undefined;
  }

  async deleteById(id: FolderId): Promise<void> {
    await this.folderRepo.delete({ id: id.value });
  }

  private toDomain = (db: FolderPersistenceEntity): FolderEntity => {
    return FolderEntity.create(
      db.id,
      db.name,
      db.tester.id,
      db.repository.id,
      db.path,
      db.description,
    );
  };
}
