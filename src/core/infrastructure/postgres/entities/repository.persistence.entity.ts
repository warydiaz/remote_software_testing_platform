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
import { TesterPersistenceEntity } from './tester.persistence.entity';

@Entity('repository')
export class RepositoryPersistenceEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ length: 255 })
  title: string;

  @ManyToOne(() => TesterPersistenceEntity, (tester) => tester.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tester_id' })
  tester: TesterPersistenceEntity;

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
