import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('experience')
export class ExperiencePersistenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'description' })
  description: string;
}
