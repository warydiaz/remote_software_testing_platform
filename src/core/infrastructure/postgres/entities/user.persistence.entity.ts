import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user')
export class UserPersistenceEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'userid' })
  userId: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  password: string;
}
