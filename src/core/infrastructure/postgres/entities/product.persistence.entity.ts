import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProjectPersistenceEntity } from './project.persistence.entity';

@Entity('product')
export class ProductPersistenceEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @PrimaryColumn({ type: 'varchar', length: 100, name: 'project_id' })
  projectId: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({ type: 'date', name: 'cycle_start_date' })
  cycleStartDate: Date;

  @Column({ type: 'date', name: 'cycle_end_date' })
  cycleEndDate: Date;

  @Column({ length: 255 })
  environment: string;

  @ManyToOne(() => ProjectPersistenceEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: ProjectPersistenceEntity;
}
