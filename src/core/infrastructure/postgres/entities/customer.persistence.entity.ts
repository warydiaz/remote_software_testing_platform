import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserPersistenceEntity } from './user.persistence.entity';
@Entity('customers')
export class CustomerPersistenceEntity {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => UserPersistenceEntity)
  @JoinColumn({ name: 'id' })
  user: UserPersistenceEntity;

  @Column()
  NIF: string;

  @Column()
  companyName: string;

  @Column()
  taxDomicile: string;
}
