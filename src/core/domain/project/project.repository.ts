import { ProjectEntity } from './project.entity';
import { Email } from '../email';
import { ProjectId } from './id';

export interface ProjectRepository {
  save(project: ProjectEntity): Promise<void>;
  findById(id: ProjectId): Promise<ProjectEntity | undefined>;
  findByEmail(email: Email): Promise<ProjectEntity | undefined>;
  findAll(): Promise<ProjectEntity[]>;
  deleteById(id: ProjectId): Promise<void>;
  update(project: ProjectEntity): Promise<void>;
  findByName(name: string): Promise<ProjectEntity | undefined>;
}

export const PROJECT_REPOSITORY = Symbol('ProjectRepository');
