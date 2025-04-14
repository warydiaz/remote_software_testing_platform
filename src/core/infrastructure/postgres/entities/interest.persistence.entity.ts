import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('testing_interest')
export class InterestPersistenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'description' })
  description: string;
}
