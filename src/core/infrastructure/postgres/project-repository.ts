import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProjectRepository } from '../../domain/project/project.repository';
import { ProjectEntity } from '../../domain/project/project.entity';
import { ProjectId } from '../../domain/project/id';
import { Email } from 'src/core/domain/email';
import { ProjectPersistenceEntity } from './entities/project.persistence.entity';
import { TestTypePersistenceEntity } from './entities/testType.persistence.entity';

@Injectable()
export class ProjectTypeOrmRepository implements ProjectRepository {
  constructor(
    @InjectRepository(ProjectPersistenceEntity)
    private readonly projectRepo: Repository<ProjectPersistenceEntity>,
    @InjectRepository(TestTypePersistenceEntity)
    private readonly testTypeRepo: Repository<TestTypePersistenceEntity>,
  ) {}

  async save(project: ProjectEntity): Promise<void> {
    const dbProject = new ProjectPersistenceEntity();
    dbProject.id = project.id.value;
    dbProject.name = project.name.value;
    dbProject.description = project.description.value;
    dbProject.email = project.email.value;
    dbProject.product = project.product.value;
    dbProject.startDate = project.startDate.value;
    dbProject.endDate = project.endDate.value;

    if (project.testTypes?.length > 0) {
      const testTypeIds = project.testTypes.map((tt) => tt.value);
      dbProject.testTypes = await this.testTypeRepo.findBy({
        id: In(testTypeIds),
      });
    }

    await this.projectRepo.save(dbProject);
  }

  async update(project: ProjectEntity): Promise<void> {
    await this.save(project);
  }

  async deleteById(id: ProjectId): Promise<void> {
    await this.projectRepo.delete({ id: id.value });
  }

  async findById(id: ProjectId): Promise<ProjectEntity | undefined> {
    const dbProject = await this.projectRepo.findOne({
      where: { id: id.value },
      relations: ['testTypes'],
    });

    return dbProject ? this.toDomain(dbProject) : undefined;
  }

  async findByEmail(email: Email): Promise<ProjectEntity | undefined> {
    const dbProject = await this.projectRepo.findOne({
      where: { email: email.value },
      relations: ['testTypes'],
    });

    return dbProject ? this.toDomain(dbProject) : undefined;
  }

  async findByName(name: string): Promise<ProjectEntity | undefined> {
    const dbProject = await this.projectRepo.findOne({
      where: { name },
      relations: ['testTypes'],
    });

    return dbProject ? this.toDomain(dbProject) : undefined;
  }

  async findAll(): Promise<ProjectEntity[]> {
    const projects = await this.projectRepo.find({ relations: ['testTypes'] });
    return projects.map(this.toDomain);
  }

  private toDomain = (db: ProjectPersistenceEntity): ProjectEntity => {
    return ProjectEntity.create(
      db.id,
      db.name,
      db.description,
      db.email,
      db.product,
      db.startDate,
      db.endDate,
      db.testTypes?.map((tt) => parseInt(tt.id)) ?? [],
    );
  };
}
