import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('project_test_type')
export class TestTypePersistenceEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ length: 255 })
  name: string;
}
