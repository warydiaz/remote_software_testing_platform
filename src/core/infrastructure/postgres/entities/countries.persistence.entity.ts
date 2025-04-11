import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('countries')
export class CountriesPersistenceEntity {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  name: string;
}
