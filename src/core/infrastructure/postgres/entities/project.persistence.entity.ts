import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { TestTypePersistenceEntity } from './testType.persistence.entity';

@Entity('project')
export class ProjectPersistenceEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 100 })
  product: string;

  @Column({ type: 'date', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date' })
  endDate: Date;

  @ManyToMany(() => TestTypePersistenceEntity)
  @JoinTable({
    name: 'project_test_type_mapping',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'test_type_id', referencedColumnName: 'id' },
  })
  testTypes: TestTypePersistenceEntity[];
}
