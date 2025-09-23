/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as OrmRepository } from 'typeorm';
import { RepositoryRepository } from '../../domain/repository/repository.repository';
import { RepositoryEntity } from '../../domain/repository/repository.entity';
import { RepositoryId } from '../../domain/repository/id';
import { RepositoryPersistenceEntity } from './entities/repository.persistence.entity';
import { RepositoryTitle } from '../../domain/repository/repositoryTitle';
import { TesterId } from '../../domain/tester/id';

@Injectable()
export class RepositoryTypeOrmRepository implements RepositoryRepository {
  constructor(
    @InjectRepository(RepositoryPersistenceEntity)
    private readonly repo: OrmRepository<RepositoryPersistenceEntity>,
  ) {}

  async save(repository: RepositoryEntity): Promise<void> {
    const dbRepository = new RepositoryPersistenceEntity();
    dbRepository.id = repository.id.value;
    dbRepository.title = repository.title.value;
    dbRepository.description = repository.description.value;
    dbRepository.tester = { id: repository.testerId.value } as any; // tester relation
    await this.repo.save(dbRepository);
  }

  async update(repository: RepositoryEntity): Promise<void> {
    await this.save(repository);
  }

  async deleteById(id: RepositoryId): Promise<void> {
    await this.repo.delete({ id: id.value });
  }

  async findById(id: RepositoryId): Promise<RepositoryEntity | undefined> {
    const dbRepository = await this.repo.findOne({
      where: { id: id.value },
      relations: ['tester'],
    });

    console.log('dbRepository: ', dbRepository);
    return dbRepository ? this.toDomain(dbRepository) : undefined;
  }

  async findByName(name: string): Promise<RepositoryEntity | undefined> {
    const dbRepository = await this.repo.findOne({
      where: { title: name },
      relations: ['tester'],
    });
    return dbRepository ? this.toDomain(dbRepository) : undefined;
  }

  async findAll(): Promise<RepositoryEntity[]> {
    const dbRepositories = await this.repo.find({ relations: ['tester'] });
    return dbRepositories.map(this.toDomain);
  }

  async findByTitleAndTesterId(
    title: RepositoryTitle,
    testerId: TesterId,
  ): Promise<RepositoryEntity | undefined> {
    const dbRepository = await this.repo.findOne({
      where: {
        title: title.value,
        tester: { id: testerId.value },
      },
      relations: ['tester'],
    });
    return dbRepository ? this.toDomain(dbRepository) : undefined;
  }

  private toDomain = (db: RepositoryPersistenceEntity): RepositoryEntity => {
    return RepositoryEntity.create(
      db.id.toString(),
      db.tester.id.toString(),
      db.title,
      db.description,
    );
  };
}
