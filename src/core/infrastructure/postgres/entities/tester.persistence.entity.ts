import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tester')
export class TesterPersistenceEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  surname: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'date', name: 'birth_date' })
  birthDate: Date;

  @Column({ type: 'int', nullable: true })
  languages: number; // referencia a languages(id)

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 20, name: 'postal_code', nullable: true })
  postalCode: string;

  @Column({ type: 'int', nullable: true })
  country: number; // referencia a countries(id)

  @Column({ type: 'int', name: 'experience_level', nullable: true })
  experienceLevel: number; // referencia a experience(id)

  @Column({ type: 'int', array: true, nullable: true })
  interests: number[]; // array de IDs de testing_interest
}
