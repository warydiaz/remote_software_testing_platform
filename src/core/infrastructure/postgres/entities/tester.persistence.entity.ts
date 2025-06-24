import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tester')
export class TesterPersistenceEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ type: 'date', name: 'birth_date' })
  birthDate: Date;

  @Column({ type: 'int', nullable: true })
  languages: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 20, name: 'postal_code', nullable: true })
  postalCode: string;

  @Column({ type: 'int', nullable: true })
  country: number;

  @Column({ type: 'int', name: 'experience_level', nullable: true })
  experienceLevel: number;

  @Column({ type: 'int', array: true, nullable: true })
  interests: number[];
}
