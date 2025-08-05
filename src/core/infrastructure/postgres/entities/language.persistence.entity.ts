import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('languages')
export class LanguagesPersistenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'language_code' })
  code: string;

  @Column({ name: 'language_name' })
  name: string;
}
