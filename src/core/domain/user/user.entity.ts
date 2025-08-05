import { Name } from '../name';
import { Surname } from '../surname';
import { CustomerId } from './id';
import { Email } from '../email';

export class UserEntity {
  private constructor(
    readonly id: CustomerId,
    readonly name: Name,
    readonly surname: Surname,
    readonly email: Email,
    readonly userId: string,
    readonly password: string,
  ) {}

  static create(
    anId: string,
    aName: string,
    aSurname: string,
    anEmail: string,
    aUserId: string,
    aPassword: string,
  ): UserEntity {
    const id = CustomerId.create(anId);
    const name = Name.create(aName);
    const surname = Surname.create(aSurname);
    const email = Email.create(anEmail);

    return new UserEntity(id, name, surname, email, aUserId, aPassword);
  }
}
