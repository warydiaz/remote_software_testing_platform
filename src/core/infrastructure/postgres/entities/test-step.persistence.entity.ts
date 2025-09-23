import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { TestPersistenceEntity } from './test.persistence.entity';

@Entity('test_step')
export class TestStepPersistenceEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ type: 'text', name: 'step_description' })
  stepDescription: string;

  @Column({ type: 'text', name: 'expected_result' })
  expectedResult: string;

  @Column({ type: 'int', name: 'step_order', default: 1 })
  stepOrder: number;

  @ManyToOne(() => TestPersistenceEntity, (test) => test.steps, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'test_id', referencedColumnName: 'id' })
  test: TestPersistenceEntity;
}
