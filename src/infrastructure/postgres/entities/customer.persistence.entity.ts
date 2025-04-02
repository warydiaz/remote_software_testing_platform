import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('customers')
export class CustomerPersistenceEntity {
  @PrimaryColumn()
  NIF: string;

  @Column()
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  companyName: string;

  @Column()
  taxDomicile: string;
}
