/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RepositoryPersistenceEntity } from './repository.persistence.entity';
import { UserPersistenceEntity } from './user.persistence.entity';

@Entity('folder')
export class FolderPersistenceEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @ManyToOne(() => RepositoryPersistenceEntity, (repository) => repository.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'repository_id' })
  repository: RepositoryPersistenceEntity;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text' })
  path: string;

  @ManyToOne(() => UserPersistenceEntity, (user) => user.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tester_id' })
  tester: UserPersistenceEntity;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'NOW()',
  })
  updatedAt: Date;
}
