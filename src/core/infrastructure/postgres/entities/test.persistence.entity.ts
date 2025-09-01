/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { TestStepPersistenceEntity } from './test-step.persistence.entity';
import { TesterPersistenceEntity } from './tester.persistence.entity';

@Entity('test')
export class TestPersistenceEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => TesterPersistenceEntity, (tester) => tester.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tester_id' })
  tester: TesterPersistenceEntity;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'test_type',
  })
  testType: 'with_steps' | 'without_steps' | 'exploratory';

  @Column({
    type: 'varchar',
    length: 10,
  })
  priority: 'high' | 'medium' | 'low';

  @Column({ type: 'boolean', default: false, name: 'is_automated' })
  isAutomated: boolean;

  @Column({ type: 'boolean', default: false, name: 'is_regression' })
  isRegression: boolean;

  @Column({ type: 'text', name: 'requirement' })
  requirement: string;

  @Column({ type: 'varchar', length: 50, name: 'sprint' })
  sprint: string;

  @Column({ type: 'text', name: 'expected_result', nullable: true })
  expectedResult?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => TestStepPersistenceEntity, (step) => step.test, {
    cascade: true,
  })
  steps: TestStepPersistenceEntity[];
}
