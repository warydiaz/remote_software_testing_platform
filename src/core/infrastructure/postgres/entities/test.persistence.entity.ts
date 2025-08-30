import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TestStepPersistenceEntity } from './test-step.persistence.entity';

@Entity('test')
export class TestPersistenceEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  testType: 'with_steps' | 'without_steps' | 'exploratory';

  @Column({
    type: 'varchar',
    length: 10,
  })
  priority: 'high' | 'medium' | 'low';

  @Column({ type: 'boolean', default: false })
  isAutomated: boolean;

  @Column({ type: 'boolean', default: false })
  isRegression: boolean;

  @Column({ type: 'text' })
  requirement: string;

  @Column({ type: 'varchar', length: 50 })
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
