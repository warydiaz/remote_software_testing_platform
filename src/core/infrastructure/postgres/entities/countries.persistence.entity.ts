import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('countries')
export class CountriesPersistenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'name' })
  name: string;
}
