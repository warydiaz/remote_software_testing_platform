import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('countries')
export class CountriesPersistenceEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;
}
